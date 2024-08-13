import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const mongoClient = new MongoClient(process.env.MONGODB_URI as string);

async function fetchAndCacheHotels() {
  try {
    await mongoClient.connect();
    const database = mongoClient.db(process.env.DATABASE);
    const hotelCollection = database.collection('HotelLists');

    // Check if the data is up-to-date (e.g., within the last 20 minutes)
    const latestUpdate = await hotelCollection.findOne(
      {},
      { sort: { _id: -1 }, projection: { _id: 0, lastUpdated: 1 } }
    );

    const twentyMinutesAgo = new Date().getTime() - 20 * 60 * 1000;

    if (latestUpdate && latestUpdate.lastUpdated && latestUpdate.lastUpdated.getTime() > twentyMinutesAgo) {
      console.log('Returning cached hotels data');
      const cachedHotels = await hotelCollection.find({}).toArray();
      return cachedHotels;
    }

    console.log('Fetching fresh data from the API');
    const apiResponse = await fetch('http://testapi.swisshalley.com/hotels/', {
      headers: {
        'X-API-KEY': process.env.X_API_KEY as string,
      },
    });

    if (!apiResponse.ok) {
      throw new Error(`API response failed: ${apiResponse.statusText}`);
    }

    const apiData = await apiResponse.json();

    // Process the data to select the cheapest offer per hotel
    const hotelMap = new Map<string, any>();
    apiData.data.hotels.forEach((item: any) => {
      const currentHotelId = item.hotel_id;
      const currentPrice = parseFloat(item.price);
      
      if (!hotelMap.has(currentHotelId) || hotelMap.get(currentHotelId).price > currentPrice) {
        hotelMap.set(currentHotelId, {
          hotelId: currentHotelId,
          name: item.hotel_name,
          country: item.country,
          countryId: item.country_id,
          city: item.city,
          cityId: item.city_id,
          price: Math.ceil(currentPrice),
          stars: parseInt(item.star, 10) || 0,
          imageUrl: item.image || '',
          cachedAt: new Date(),
          lastUpdated: new Date(),
        });
      } else if (item.image) {
        // Update imageUrl if a hotel offer has an image
        const existingHotel = hotelMap.get(currentHotelId);
        if (!existingHotel.imageUrl) {
          existingHotel.imageUrl = item.image;
          hotelMap.set(currentHotelId, existingHotel);
        }
      }
    });

    const updatedHotels = Array.from(hotelMap.values());

    const bulkOperations = updatedHotels.map(hotel => ({
      updateOne: {
        filter: { hotelId: hotel.hotelId },
        update: { $set: hotel },
        upsert: true,
      },
    }));

    await hotelCollection.bulkWrite(bulkOperations);

    return updatedHotels;
  } catch (error) {
    console.error('Error fetching hotels data:', error);
    return [];
  } finally {
    await mongoClient.close();
  }
}

export async function GET() {
  const hotels = await fetchAndCacheHotels();
  return NextResponse.json(hotels);
}

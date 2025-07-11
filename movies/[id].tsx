import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { fetchMoviedetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { icons } from '@/app/constants/icons';

interface MovieInfoProps {
  label: string;
  value ?: string |number | null
}


const MovieInfo = ({ label, value}: MovieInfoProps) => {
  return (
    <View className="flex-col items-center justify-center mt-5">
      <Text className="text-light-200 font-nprmal text-sm">
        {label}
      </Text>
      <Text className="text-light-100 font-nprmal text-sm">
        {value || 'N/A'}
      </Text>
    </View>
  );
};

const MovieDetails = () => {
  const router = useRouter();
    const {id} = useLocalSearchParams();

    const {data:movie, loading} = useFetch(()=>
        fetchMoviedetails(id as string)
    );

     if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );
  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri:
                Array.isArray(movie) || !movie?.poster_path
                  ? undefined
                  : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />

          <TouchableOpacity className="absolute bottom-5 right-5 rounded-full size-14 bg-white flex items-center justify-center">
            <Image
              source={icons.play}
              className="w-6 h-7 ml-1"
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">
            {!Array.isArray(movie) ? movie?.title : ''}
          </Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm">
              {!Array.isArray(movie) && movie?.release_date ? movie.release_date.split("-")[0] : ''} •
            </Text>
            <Text className="text-light-200 text-sm">
              {!Array.isArray(movie) && movie?.runtime ? `${movie.runtime}m` : ''}
            </Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />

            <Text className="text-white font-bold text-sm">
              {!Array.isArray(movie) ? Math.round(movie?.vote_average ?? 0) : 0}/10
            </Text>

            <Text className="text-light-200 text-sm">
              {(!Array.isArray(movie) && movie?.vote_count !== undefined)
                ? `(${movie.vote_count} votes)`
                : ''}
            </Text>
          </View>

          <MovieInfo label="Overview" value={!Array.isArray(movie) ? movie?.overview : undefined} />
          <MovieInfo
            label="Genres"
          value={(movie as any)?.genres?.map((g: any) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo
              label="Budget"
              value={`$${((movie as any )?.budget ?? 0) / 1_000_000} million`}
            />
            <MovieInfo
              label="Revenue"
             value={`$${Math.round(
  ((movie as any)?.revenue ?? 0) / 1_000_000
)} million`}
            />
          </View>

          <MovieInfo
            label="Production Companies"
            value={
  (movie as any)?.production_companies?.map((c: any) => c.name).join(" • ") ||
  "N/A"
}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );

  
}

export default MovieDetails

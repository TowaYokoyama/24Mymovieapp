import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'
import { images } from '@/app/constants/images'
import MovieCard from '@/components/MovieCard'
import { useRouter } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/app/constants/icons'
import SearchBar from '@/components/SearchBar'
import { updateSearchCount } from '@/services/appwrite'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

   const router = useRouter();


  const { data: movies = [], loading, error, refetch: loadMovies, reset} = useFetch(() => fetchMovies({
    query:  searchQuery
  }), false)

  useEffect(()=> {
    updateSearchCount(searchQuery, movies[0]);

    const timeoutId = setTimeout(async () => {

    
    if(searchQuery.trim()){
      await loadMovies();

      if (movies?.length >0 && movies?.[0]){
       await  updateSearchCount(searchQuery, movies[0]);
      }
    } else {
      reset()
    }
  },500); //ミリ秒単位

  return ()=> clearTimeout(timeoutId);
  },[searchQuery])



  return (
    <View className="flex-1 bg-primary">
     <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />

     <FlatList
           data={movies}
           renderItem={({ item }) => <MovieCard {...item} />}
           keyExtractor={(item) => item.id.toString()}
           className="px-5"
           numColumns={3}
           columnWrapperStyle={{
            justifyContent: 'center',
            gap: 16,
            marginVertical: 16,
           }}
           contentContainerStyle={{
            paddingBottom: 100
           }}
           ListHeaderComponent={<>
           <View className="w-full flex-row justify-center mt-20 item-center">
            <Image source={icons.logo} className="w-12 h-10 "/>
           </View>

           <View className="my-5">
            <SearchBar 
            placeholder="Search movies .."
            value={searchQuery}
            onChangeText ={(text :string)=> setSearchQuery(text)}
             />
           </View>

           {loading && (
            <ActivityIndicator size="large" color="0000ff" className="my-3" /> 
           )}

           {error && (
            <Text className="text-gray-500 px-5 my-3">
              Error: {error.message}
            </Text>
           )}

           {!loading && !error && searchQuery.trim()
            && movies?.length > 0 && (
            <Text className="text-xl text-white font-bold">
              Search Results for {''}
              <Text className="text-[#A8B6FF]">{ searchQuery}</Text>
            </Text>
           )}
           </>}
           ListEmptyComponent={
            !loading && !error ? (
              <View className="mt-10 px-5">
                <Text className="text-center text-gray-500">
                  {searchQuery.trim() ? 'No Movies found' : 'Search fro a movie'}
                </Text>
              </View>
            ) : null
           }
       />
    </View>
  )
}

export default Search


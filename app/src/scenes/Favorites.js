import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import { AuthContext } from '../context/auth/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

import { RootView, MainCard, Loader } from '../components';
import R from '../R';
import { BASE_URL } from '../utils/Constants';
export const Favorites = ({ navigation }) => {
  const [listData, setListData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [showLoader, setShowLoader] = useState(false);
  const [flatListRefreshing, setFlatListRefreshing] = useState(false);
  const { authState } = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      getDataApiCall()
    }, [])
  );

  const getDataApiCall = () => {
    console.log("🚀 ~ file: Favorites.js call hua")
    setShowLoader(true);
    var axios = require('axios');
    var config = {
      method: 'get',
      url: BASE_URL + `/api/favourite-list?page=${pageNo}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authState.userToken,
      },
    };
    axios(config)
      .then((response) => {
        console.log("🚀 ~ file: Favorites.js ~ line 46 ~ .then ~ response", response)
        setShowLoader(false)
        let data = response.data;
        let finalData = [...listData, ...data];
        setListData(finalData);
        setPageNo(pageNo + 1);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
      });
  };

  const renderFooter = () => {
    if (flatListRefreshing) {
      return (
        <View
          style={{
            height: R.dimensions.hp(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
      );
    } else {
      return null;
    }
  };
  const handleFavToggle = (item) => {
    let testData = [...listData]
    testData = testData.filter((e) => e.memberProfileId != item.memberProfileId)
    setListData(testData)
  }

  return (
    <RootView>
      <Loader isVisible={showLoader} />
      <FlatList
        data={listData}
        extraData={listData}
        renderItem={(item) => (
          <MainCard
            deleteFavCallBack={() => handleFavToggle(item.item)}
            onPress={() =>
              navigation.navigate('ProfileDetails', { item: item.item.memberId })
            }
            item={item.item}
          />
        )}
        onEndReached={() => (listData.length > 4 ? getDataApiCall() : null)}
        onEndReachedThreshold={0.2}
        keyExtractor={(item) => item.memberProfileId.toString()}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={() => <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            paddingTop: 20,
          }}>
          No Favorites found
        </Text>}
      />
    </RootView>
  );
};

const styles = StyleSheet.create({});

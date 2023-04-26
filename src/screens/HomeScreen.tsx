import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {NavigationProp, StackActions} from '@react-navigation/native';
import {fetchEventsAsync} from '../store/events';
import {RootState} from '../store/store';
import {GithubEvent} from '../api/github';

type Props = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {data, isLoading, lastUpdated} = useSelector(
    (state: RootState) => state.events,
  );

  const interval = setInterval(() => {
    dispatch(fetchEventsAsync());
  }, 30000);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchEventsAsync());
    });

    return unsubscribe;
  }, [dispatch, navigation]);

  useEffect(() => {
    dispatch(fetchEventsAsync());
  }, [dispatch]);

  useEffect(() => {
    interval;
    return () => clearInterval(interval);
  }, [dispatch, interval]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchEventsAsync());
    setRefreshing(false);
    clearInterval(interval);
  };

  const handleItemPress = useCallback(
    (item: GithubEvent) => {
      navigation.dispatch(StackActions.push('Details', {item}));
      clearInterval(interval);
    },
    [navigation, interval],
  );

  const renderItem = React.useCallback(
    ({item}: {item: GithubEvent}) => (
      <TouchableOpacity
        onPress={() => handleItemPress(item)}
        style={styles.itemContainer}>
        <Image style={styles.avatar} source={{uri: item.actor.avatar_url}} />
        <View style={{flex: 1}}>
          <Text style={styles.itemTitle}>name: {item.actor.display_login}</Text>
          <Text style={styles.itemSubtitle}>type: {item.type}</Text>
          <Text style={styles.itemSubtitle}>ev id: {item.created_at}</Text>
          <Text style={styles.itemSubtitle}>repo: {item.repo.name}</Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  const emptyData = () => {
    return <Text>Нет данных</Text>;
  };

  return (
    <>
      <SafeAreaView style={styles.container} />
      {isLoading && <Text style={{textAlign: 'center'}}>Loading ...</Text>}
      <View style={styles.header}>
        <Text style={styles.title}>GitHub Events</Text>
        <Text style={styles.subtitle}>
          Last updated:{' '}
          {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '-'}
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.contentContainerStyle}
        ListEmptyComponent={emptyData}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#d8e9ff',
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 20,
    alignSelf: 'center',
    borderRadius: 5,
  },
  contentContainerStyle: {paddingHorizontal: 20, paddingVertical: 10},
});

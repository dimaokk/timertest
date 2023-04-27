import React, {useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {GithubEvent} from '../api/github';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<{item: GithubEvent}, 'item'>;
};

const DetailsScreen: React.FC<Props> = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.type}</Text>
      <View>
        <Text style={styles.subtitle}>Created at: {item.created_at}</Text>
        <Text style={styles.subtitle}>repo url: {item.repo.url}</Text>
        <Text style={styles.subtitle}>login: {item.actor.login}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>fdsfds</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  body: {
    fontSize: 18,
  },
});

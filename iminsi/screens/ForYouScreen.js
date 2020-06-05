/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getArticles, getInterests } from '../actions/index';
import styles from '../stylesheets/ForYouStyle';
import HighlightedNews from '../components/HighlightedNews';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Pill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      color: 'rgb(158, 158, 158)',
      textColor: 'black',
    };
  }

  colorFlip = () => {
    if (this.state.clicked) {
      this.setState(() => ({
        clicked: false,
        color: 'rgb(158, 158, 158)',
      }));
    } else {
      this.setState(() => ({
        clicked: true,
        color: 'rgb(56, 60, 108)',
        textColor: 'black',
      }));
    }
  }

  render() {
    return (
      <TouchableOpacity key={this.props.name}
        style={{

          borderRadius: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: this.state.color, width: ((74 / 360) * windowWidth), height: ((26 / 640) * windowHeight), marginRight: windowHeight / 50,
        }}
        onPress={() => { this.colorFlip(); this.props.pillClick(this.props.interestObj); }}
      >
        <Text style={{
          fontFamily: 'Baskerville',
          fontWeight: '200',
          color: this.state.textColor,
        }}
        >
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

class ForYouScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInterests: [],
    };
  }

  componentDidMount() {
    this.props.getArticles();
    this.props.getInterests();
    // this.props.getUserInterests();
  }

  pillClick = (interest) => {
    const newStateArray = this.state.selectedInterests.slice();
    let x = 0;
    this.state.selectedInterests.forEach((int, idx) => {
      if (int.interestName === interest.interestName) {
        // remove it
        newStateArray.splice(idx, 1);
        this.setState(() => ({
          selectedInterests: newStateArray,
        }));
        x++;
      }
    });
    if (x === 0) {
      // ADDS TO IT from top
      newStateArray.unshift(interest);
      this.setState(() => ({
        selectedInterests: newStateArray,
      }));
    }
  }

  capitalizeTag = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getArticlesForInterest = (interest) => {
    console.log(interest.articles);
    return this.props.articles;
  }

  render() {
    // eslint-disable-next-line prefer-destructuring
    /*
    <Text>
          {' '}
          Hello world
          {' '}
          {JSON.stringify(this.props.articles)}
        </Text>
    */
    console.log('testing', JSON.stringify(this.props.allInterests.length));
    if (this.props.currentUser !== undefined && this.props.currentUser !== null) {
      console.log('hello');
      return (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.topBar}>
            <ScrollView
              horizontal
              contentContainerStyle={styles.scroll}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={200}
              decelerationRate="fast"
              alwaysBounceHorizontal
            >
              {this.props.currentUser.interests.map((interest) => {
                return (
                  <Pill key={interest.interestName} interestObj={interest} name={this.capitalizeTag(interest.interestName)} pillClick={this.pillClick} />
                );
              })}
            </ScrollView>
          </View>
          {this.state.selectedInterests.map((interest) => {
            return (
              <HighlightedNews
                articleNav={(article) => { this.props.navigation.navigate('ArticleDetail', { article }); }}
                navTrigger={() => { this.props.navigation.navigate('Interest Screen', { name: interest.interestName, articles: interest.articles }); }}
                title={this.capitalizeTag(interest.interestName)}
                key={interest.interestName}
                articles={interest.articles.slice(1, -1)}
                numberOfArticles={interest.articles.slice(1, -1).length}
              />
            );
          })}
        </ScrollView>
      );
    } else {
      // console.log('for you', this.props.currentUser);
      this.props.navigation.navigate('Sign In');
      return (
        <Text>Loading...</Text>
      );
    }
  }
}

function mapReduxStateToProps(reduxState) {
  return {
    articles: reduxState.article.articles,
    currentUser: reduxState.user.currentUser,
    allInterests: reduxState.interest.interests,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getArticles: () => {
      dispatch(getArticles());
    },
    // getUserInterests: () => {
    //   dispatch(getUserInterests());
    // },
    getInterests: () => {
      dispatch(getInterests());
    },
  };
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(ForYouScreen);

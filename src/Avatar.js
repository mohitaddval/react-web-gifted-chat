import React, { Component } from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import GiftedAvatar from './GiftedAvatar';
import { isSameUser, isSameDay, warnDeprecated } from './utils';

const styles = {
  left: StyleSheet.create({
    container: {
      marginRight: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: 8,
    },
    onTop: {
      alignSelf: 'flex-start',
    },
    onBottom: {},
    image: {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  }),
};

export default class Avatar extends Component {
  renderAvatar() {
    const { renderAvatar, ...avatarProps } = this.props;
    const { position, imageStyle, currentMessage, onPressAvatar } = avatarProps;

    if (renderAvatar) {
      return renderAvatar(avatarProps);
    }
    return (
      <GiftedAvatar
        avatarStyle={
          currentMessage.user.avatar ? StyleSheet.flatten([styles[position].image, imageStyle[position]]) : { width: 0, height: 0 }
        }
        user={currentMessage.user}
        onPress={() => onPressAvatar && this.props.onPressAvatar(currentMessage.user)}
        onClick={() => onPressAvatar && this.props.onPressAvatar(currentMessage.user)}
      />
    );
  }

  render() {
    const {
      renderAvatarOnTop,
      renderAllAvatars,
      previousMessage,
      nextMessage,
      position,
      containerStyle,
      imageStyle,
    } = this.props;

    const messageToCompare = renderAvatarOnTop ? previousMessage : nextMessage;
    const computedStyle = renderAvatarOnTop ? 'onTop' : 'onBottom';

    if (!renderAllAvatars && isSameUser(this.props.currentMessage, messageToCompare)
      && isSameDay(this.props.currentMessage, messageToCompare)) {
      return (
        <View style={[styles[position].container, containerStyle[position]]}>
          <GiftedAvatar
            avatarStyle={StyleSheet.flatten([styles[position].image, imageStyle[position]])}
          />
        </View>
      );
    }

    return (
      <View
        style={[styles[position].container, styles[position][computedStyle], containerStyle[position]]}
      >
        {this.renderAvatar()}
      </View>
    );
  }
}


Avatar.defaultProps = {
  renderAvatarOnTop: false,
  position: 'left',
  currentMessage: {
    user: null,
  },
  previousMessage: {
    user: null,
  },
  onPressAvatar: null,
  renderAvatar: null,
  renderAllAvatars: null,
  nextMessage: {},
  containerStyle: {},
  imageStyle: {},
  // TODO: remove in next major release
  isSameDay: warnDeprecated(isSameDay),
  isSameUser: warnDeprecated(isSameUser),
};

Avatar.propTypes = {
  renderAvatarOnTop: PropTypes.bool,
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  onPressAvatar: PropTypes.func,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  imageStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  renderAvatar: PropTypes.func,
  renderAllAvatars: PropTypes.bool,
  // TODO: remove in next major release
  isSameDay: PropTypes.func,
  isSameUser: PropTypes.func,
};

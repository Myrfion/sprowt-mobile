import React from 'react';
import {AxiosError} from 'axios';
import {showMessage} from 'react-native-flash-message';
import {InformationIcon} from './icons';
import {BaseTheme} from './theme';
import NotificationButton from './NotificationButton';

type ButtonProps = {
  text: string;
  onPress: () => void;
};

// for onError react queries and mutations
export const showError = (error: AxiosError) => {
  console.log(JSON.stringify(error?.response?.data));
  const description = extractError(error?.response?.data).trimEnd();

  showMessage({
    backgroundColor: BaseTheme.colors.neutral50,
    message: 'Please note',
    description,
    type: 'danger',
    duration: 4000,
    renderFlashMessageIcon: () => <InformationIcon />,
  });
};

export const showErrorMessage = (message: string = 'Something went wrong ') => {
  showMessage({
    backgroundColor: BaseTheme.colors.neutral50,
    message: 'Please note',
    description: message,
    type: 'danger',
    duration: 4000,
    renderFlashMessageIcon: () => (
      <InformationIcon color={BaseTheme.colors.red} />
    ),
    icon: 'auto',
    titleStyle: {fontWeight: 'bold'},
    color: BaseTheme.colors.neutral900,
  });
};

export const showSuccessMessage = (message: string = 'Nice!') => {
  showMessage({
    backgroundColor: BaseTheme.colors.neutral50,
    message: message,
    type: 'success',
    duration: 4000,
    renderFlashMessageIcon: () => (
      <InformationIcon color={BaseTheme.colors.success200} />
    ),
    icon: 'auto',
    titleStyle: {fontWeight: 'bold'},
    color: BaseTheme.colors.neutral900,
  });
};

export const showErrorMessageWithButton = (
  message: string,
  button: ButtonProps,
) => {
  showMessage({
    backgroundColor: BaseTheme.colors.neutral50,
    message: 'Please note',

    type: 'danger',
    duration: 100000,
    renderFlashMessageIcon: () => (
      <InformationIcon color={BaseTheme.colors.red} />
    ),
    icon: 'auto',
    titleStyle: {fontWeight: 'bold'},
    color: BaseTheme.colors.neutral900,
    renderCustomContent: () => (
      <NotificationButton
        message={message}
        onPress={button.onPress}
        buttonText={button.text}
        color={BaseTheme.colors.red}
      />
    ),
  });
};

export const showSuccessMessageWithButton = (
  message: string,
  button: ButtonProps,
) => {
  showMessage({
    backgroundColor: BaseTheme.colors.neutral50,
    message: 'Please note',

    type: 'success',
    duration: 100000,
    renderFlashMessageIcon: () => (
      <InformationIcon color={BaseTheme.colors.success200} />
    ),
    icon: 'auto',
    titleStyle: {fontWeight: 'bold'},
    color: BaseTheme.colors.neutral900,
    renderCustomContent: () => (
      <NotificationButton
        message={message}
        onPress={button.onPress}
        buttonText={button.text}
        color={BaseTheme.colors.success200}
      />
    ),
  });
};

export const extractError = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }
  if (Array.isArray(data)) {
    const messages = data.map(item => {
      return `  ${extractError(item)}`;
    });

    return `${messages.join('')}`;
  }

  if (typeof data === 'object' && data !== null) {
    const messages = Object.entries(data).map(item => {
      const [key, value] = item;
      const separator = Array.isArray(value) ? ':\n ' : ': ';

      return `- ${key}${separator}${extractError(value)} \n `;
    });
    return `${messages.join('')} `;
  }
  return 'Something went wrong ';
};

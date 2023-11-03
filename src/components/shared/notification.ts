import { notifications } from '@mantine/notifications';

export const SuccessNotification = (message: string) => {
  notifications.show({
    message,
  });
};

export const WarnNotification = (message: string) => {
  notifications.show({
    message,
    color: 'yellow',
  });
};

export const ErrorNotification = (message: string) => {
  notifications.show({
    message,
    color: 'red',
  });
};

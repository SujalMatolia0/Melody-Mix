import { notifications } from '@mantine/notifications';

export const SucessNoti = (message: string, title?: string) => {
  notifications.show({
    title,
    message,
  });
};

export const WarnNoti = (message: string, title?: string) => {
  notifications.show({
    title,
    message,
    color: 'yellow',
  });
};

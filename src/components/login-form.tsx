import { zodResolver } from '@hookform/resolvers/zod';
import { t } from 'i18next';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';

const schema = z.object({
  email: z
    .string({
      required_error: t('login.emailRequiredError'),
    })
    .email(t('login.emailInvalidError')),
  password: z
    .string({
      required_error: t('login.passwordRequiredError'),
    })
    .min(6, t('login.passwordMinLengthError')),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <View className="items-center justify-center">
          <Text
            testID="form-title"
            className="pb-6 text-center text-4xl font-bold"
          >
            {t('login.title')}
          </Text>

          <Text className="mb-6 max-w-xs text-center text-gray-500">
            {t('login.welcomeMessage')}
          </Text>
        </View>

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label={t('login.emailLabel')}
          placeholder={t('login.emailPlaceholder')}
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label={t('login.passwordLabel')}
          placeholder={t('login.passwordPlaceholder')}
          secureTextEntry={true}
        />
        <Button
          testID="login-button"
          label={t('login.loginButton')}
          onPress={handleSubmit(onSubmit)}
        />

        <View className="mt-4 items-center">
          <Text className="text-gray-500">{t('login.noAccountMessage')}</Text>
          <Button label={t('login.registerButton')} variant="ghost" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

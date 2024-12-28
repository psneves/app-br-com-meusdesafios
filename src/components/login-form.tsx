import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';

const schema = z.object({
  nome: z.string().optional(),
  email: z
    .string({
      required_error: 'O e-mail é obrigatório',
    })
    .email('Formato de e-mail inválido'),
  senha: z
    .string({
      required_error: 'A senha é obrigatória',
    })
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
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
            Meus Desafios
          </Text>

          <Text className="mb-6 max-w-xs text-center text-gray-500">
            Bem-vindo(a) de volta! 👋
            <br />
            Acesse sua conta e continue sua jornada!
          </Text>
        </View>

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label="E-mail"
          placeholder="Digite seu e-mail"
        />
        <ControlledInput
          testID="password-input"
          control={control}
          name="senha"
          label="Senha"
          placeholder="Digite sua senha"
          secureTextEntry={true}
        />
        <Button
          testID="login-button"
          label="Entrar"
          onPress={handleSubmit(onSubmit)}
        />

        <View className="mt-4 items-center">
          <Text className="text-gray-500">Ainda não tem conta? </Text>
          <Button
            testID="register-button"
            label="Cadastre-se"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

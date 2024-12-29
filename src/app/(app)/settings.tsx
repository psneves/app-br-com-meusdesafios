/* eslint-disable react/react-in-jsx-scope */
import { Env } from '@env';
import { useColorScheme } from 'nativewind';
import React from 'react';

import { Item } from '@/components/settings/item';
import { ItemsContainer } from '@/components/settings/items-container';
import { LanguageItem } from '@/components/settings/language-item';
import { ThemeItem } from '@/components/settings/theme-item';
import {
  colors,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/components/ui';
import { Rate, Website } from '@/components/ui/icons';
import { translate, useAuth } from '@/lib';

export default function Settings() {
  const signOut = useAuth.use.signOut();
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];
  return (
    <>
      <FocusAwareStatusBar />

      <ScrollView>
        <View className="flex-1 px-4 pt-16 ">
          <Text className="text-xl font-bold">
            {translate('settings.title')}
          </Text>
          <ItemsContainer title="settings.generale">
            <LanguageItem />
            <ThemeItem />
          </ItemsContainer>

          <ItemsContainer title="settings.info">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <ItemsContainer title="settings.links">
            <Item
              text="settings.rate"
              icon={<Rate color={iconColor} />}
              onPress={() => {}}
            />
            <Item
              text="settings.privacy"
              icon={<Website color={iconColor} />}
              onPress={() => {
                window.open('https://meusdesafios.com.br/termos-uso', '_blank');
              }}
            />
            <Item
              text="settings.terms"
              icon={<Website color={iconColor} />}
              onPress={() => {
                window.open('https://meusdesafios.com.br/termos-uso', '_blank');
              }}
            />
            <Item
              text="settings.website"
              icon={<Website color={iconColor} />}
              onPress={() => {
                window.open('https://meusdesafios.com.br', '_blank');
              }}
            />
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

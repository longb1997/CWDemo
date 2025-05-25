import React, {memo, useCallback, useMemo} from 'react';
import {View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const ContentContainer = styled.View<{height: number}>`
  background-color: #fff;
  width: 100%;
  height: 68px;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.Text<{focused: boolean}>`
  font-size: 10px;
  text-align: center;
  color: ${p => (p.focused ? '#22B958' : '#888')};
  margin-top: 4px;
  padding: 0 4px;
  font-weight: ${p => (p.focused ? 'bold' : 'normal')};
`;

const ButtonFlex = styled.TouchableOpacity<{bottom: number}>`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const BtnView = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 4px;
`;

const TopTab = styled.View`
  position: absolute;
  top: 0;
  height: 2px;
  width: 100%;
  background-color: #22b958;
`;

export const CustomTabBar = memo(function CustomTabBar({
  state,
  descriptors,
  navigation,
}) {
  const safe = useSafeAreaInsets();

  const onButtonPress = useCallback(
    ({
      routeKey,
      routeName,
      isFocused,
    }: {
      routeName: string;
      routeKey: string;
      isFocused: boolean;
    }) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: routeKey,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        //@ts-ignore
        navigation.navigate(routeName);
        return;
      }
    },
    [],
  );

  const renderBottom = () => {
    let _style: ViewStyle | any = {};
    const _Btn = ButtonFlex;

    return (
      <>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const label =
            options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;
          return (
            <_Btn
              key={'tab-' + index.toString()}
              onPress={() => {
                onButtonPress({
                  routeName: route.name,
                  routeKey: route.key,
                  isFocused: state.index === index,
                });
              }}
              style={_style}
              bottom={safe.bottom}>
              {isFocused ? <TopTab /> : null}
              <View>
                <BtnView>
                  {options &&
                    options.tabBarIcon &&
                    options.tabBarIcon({
                      focused: isFocused,
                      color: '',
                      size: 0,
                    })}
                </BtnView>
              </View>
              <Label numberOfLines={1} focused={isFocused}>
                {label}
              </Label>
            </_Btn>
          );
        })}
      </>
    );
  };

  const bottomBarHeight = useMemo(() => {
    return safe.bottom + 56;
  }, [safe.bottom]);

  return (
    <ContentContainer height={bottomBarHeight}>
      {renderBottom()}
    </ContentContainer>
  );
});

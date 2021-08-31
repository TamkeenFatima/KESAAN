import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from './context';

export function SidebarMenu(props) {
    const { logOut } = useContext(AuthContext);
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <Drawer.Section>
                    <DrawerItem
                        icon={({color, size}) => (
                            <Icon
                                name="exit-to-app"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Log Out"
                        onPress={() => {logOut()}}
                    />
                </Drawer.Section>
            </DrawerContentScrollView>
        </View>
    )
}

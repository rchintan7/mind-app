import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Card from '../../../../../components/card/card';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './expansionTile.styles';
import Colors from '../../../../../constants/colors';
import GlobalStyles from '../../../../../styles/GlobalStyles';

interface ExpansionTileProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    islogin?: boolean;
}

const ExpansionTile: React.FC<ExpansionTileProps> = ({ title, icon, children, islogin }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                <Card style={[styles.cardStyle, { backgroundColor: expanded ? (islogin ? Colors.red : Colors.textColor) : Colors.white }]}>
                    {icon}
                    <Text style={[styles.tileTitle, expanded ? styles.expandedText : styles.collapsedText]}>{title}</Text>
                    <Icon
                        name={expanded ? "keyboard-arrow-down" : "keyboard-arrow-right"}
                        size={24}
                        color={expanded ? Colors.white : Colors.textColor}
                    />
                </Card>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.tileBody}>
                    {children}
                </View>
            )}
        </View>
    );
};

export default ExpansionTile;
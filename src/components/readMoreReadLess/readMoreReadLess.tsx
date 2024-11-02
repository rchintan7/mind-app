import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './readMoreReadLess.styles';

interface ReadMoreReadLessProps {
    text: string;
    numberOfLines?: number;
}

const ReadMoreReadLess: React.FC<ReadMoreReadLessProps> = ({ text, numberOfLines = 2 }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <View>
            <Text
                style={styles.text}
                numberOfLines={isExpanded ? undefined : numberOfLines}
            >
                {text}{' '}
            </Text>
            <Text onPress={toggleExpand} style={styles.readMoreLessText}>
                {isExpanded ? 'Weniger Anzeigen' : 'Mehr anzeigen'}
            </Text>
        </View>
    );
};

export default ReadMoreReadLess;
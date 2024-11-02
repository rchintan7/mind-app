import React from "react"
import { SafeAreaView, ScrollView, Text, View, useWindowDimensions } from "react-native";
import Colors from "../../../constants/colors";
import SizedBox from "../../../components/sizedbox/sizedbox";
import CustomButton from "../../../components/customButton/customButton";
import OutlinedButton from "../../../components/outlinedButton/outlinedButton";
import { styles } from "./cookies.styles";
import { Svgs } from "../../../constants/images";
import GlobalStyles from "../../../styles/GlobalStyles";

const CookiesScreen = ({ navigation }: any) => {
    const { height, width } = useWindowDimensions();

    return (
        <SafeAreaView style={[GlobalStyles.container, GlobalStyles.margin16]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <SizedBox height={height * 0.05} />
                <View style={GlobalStyles.center}>
                    <Svgs.undrawPersonalSettings height={150} width={200} style={{ color: Colors.primaryColor }} />
                </View>
                <SizedBox height={20} />
                <Text style={styles.title}>{`Für dich\nmaßgeschneidert`}</Text>
                <SizedBox height={20} />
                <View style={{ marginHorizontal: '8%', alignItems: 'center' }}>
                    <Text style={styles.description}>{`Lorem ipsum dolor sit amet consectetur. Nec elit ullamcorper lectus a magna placerat dolor. Egestas venenatis ipsum facilisis quam et nullam nam. Mattis odio ipsum duis purus arcu sed aliquet maecenas. Aliquet tempus sit sed lobortis volutpat nisl habitant. Tincidunt velit nec odio quam. Eleifend ut dignissim nulla sodales. Id mauris dui at mattis dui ultricies adipiscing libero tincidunt. Non morbi nulla justo orci. Ac lectus arcu velit volutpat auctor eget. Nulla mattis viverra arcu tellus vitae ornare elementum mus. A.`}</Text>
                    <SizedBox height={height * 0.05} />
                    <OutlinedButton
                        onPress={() => navigation.navigate('WelcomeSlideScreen')}
                        title="Cookies ablehnen"
                        buttonStyle={styles.buttonStyle}
                    />
                    <SizedBox height={10} />
                    <CustomButton
                        onPress={() => navigation.navigate('WelcomeSlideScreen')}
                        title="Akzeptieren"
                        buttonStyle={styles.buttonStyle}
                    />
                    <SizedBox height={20} />
                </View>
                <SizedBox height={20} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default CookiesScreen;
import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import AppBar from '../../../components/appbar/appbar';
import { Images } from '../../../constants/images';
import GlobalStyles from '../../../styles/GlobalStyles';
import SelectChip from '../../chat_flow/chat/layoutComponents/selectChip/selectChip';
import SelectImageModal from '../../chat_flow/chat/layoutComponents/selectImageModal/selectImageModal';

const DiaryEntryScreen = ({ navigation }: any) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  return (
    <View style={GlobalStyles.container}>
      <AppBar onBackPress={() => navigation.goBack()} title='Archiv' />

      <ScrollView style={GlobalStyles.paddingHorizontal}>
        <View style={GlobalStyles.leftMessage}>
          <Image source={Images.floatingIcon} style={GlobalStyles.avatar} />
          <View style={GlobalStyles.chatDefaultContainer}>
            <Text style={GlobalStyles.chatDefaultText}>
              Hier kannst du für den 13.08.2024 einen neuen Eintrag zu deinem Tagebuch hinzufügen.
            </Text>
          </View>
        </View>

        <View style={GlobalStyles.rightMessage}>
          <View style={GlobalStyles.chatSecondaryContainer}>
            <Text style={GlobalStyles.chatSecondaryText}>
              Lorem ipsum dolor sit amet consectetur. Accumsan posuere a ipsum nisi ante consequat eget arcu donec.
            </Text>
          </View>
        </View>

        <View style={GlobalStyles.leftMessage}>
          <Image source={Images.floatingIcon} style={GlobalStyles.avatar} />
          <View style={GlobalStyles.chatDefaultContainer}>
            <Text style={GlobalStyles.chatDefaultText}>
              Wie ging es dir heute?
            </Text>
          </View>
        </View>
        <View style={GlobalStyles.rightMessage}>
          <View style={GlobalStyles.groupRightMessage}>
            <SelectChip text={'😕 Schlecht'} onChangeValue={(v: boolean) => { }} />
            <SelectChip text={'😐 Geht so'} onChangeValue={(v: boolean) => { }} />
            <SelectChip text={'🙂 Normal'} onChangeValue={(v: boolean) => { }} />
            <SelectChip text={'😊 Gut'} onChangeValue={(v: boolean) => { }} />
            <SelectChip text={'😁 Super'} onChangeValue={(v: boolean) => { }} />
          </View>
        </View>

        <View style={GlobalStyles.leftMessage}>
          <Image source={Images.floatingIcon} style={GlobalStyles.avatar} />
          <View style={GlobalStyles.chatDefaultContainer}>
            <Text style={GlobalStyles.chatDefaultText}>
              Woran liegt das?
            </Text>
          </View>
        </View>
        <View style={GlobalStyles.rightMessage}>
          <View style={GlobalStyles.groupRightMessage}>
            <SelectChip text={'❤️ Beziehung'} onChangeValue={(v: boolean) => { }} />
            <SelectChip text={'💪 Sport'} onChangeValue={(v: boolean) => { }} />
            <SelectChip text={'👫 Freunde'} onChangeValue={(v: boolean) => { }} />
            <SelectChip text={'🎓 Schule/Studium'} onChangeValue={(v: boolean) => { }} />
            <SelectChip text={'❤️ Familie'} onChangeValue={(v: boolean) => { }} />
            <SelectChip text={'💼 Arbeit'} onChangeValue={(v: boolean) => { }} />
          </View>
        </View>

        <View style={GlobalStyles.leftMessage}>
          <Image source={Images.floatingIcon} style={GlobalStyles.avatar} />
          <View style={GlobalStyles.chatDefaultContainer}>
            <Text style={GlobalStyles.chatDefaultText}>
              Möchtest du den Eintrag speichern?
            </Text>
          </View>
        </View>
        <View style={GlobalStyles.rightMessage}>
          <SelectChip text={'Nein'} onChangeValue={(v: boolean) => { }} />
          <SelectChip text={'👍 Ja!'} onChangeValue={(v: boolean) => { showModal() }} />
        </View>
      </ScrollView>

      <SelectImageModal isVisible={isModalVisible} onClose={hideModal} />
    </View>
  );
};

export default DiaryEntryScreen;
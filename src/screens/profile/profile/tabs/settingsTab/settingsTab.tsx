import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Svgs } from '../../../../../constants/images';
import Colors from '../../../../../constants/colors';
import OutlinedButton from '../../../../../components/outlinedButton/outlinedButton';
import ToggleSwitch from 'toggle-switch-react-native';
import SizedBox from '../../../../../components/sizedbox/sizedbox';
import CustomButton from '../../../../../components/customButton/customButton';
import CustomInput from '../../../../../components/customInput/customInput';
import { styles } from './settingsTab.styles';
import { clearAllAsync } from '../../../../../config/async';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionSetUserJWTToken,
  setNotificationsAllowed,
  setAnalysisAllowed,
  setFirstname,
  setLastname,
} from '../../../../../state/slices/user.slice';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FEEDBACKSUPPORT_FIELDS_SCHEMA } from './settingsTab.types';
import GlobalStyles from '../../../../../styles/GlobalStyles';
import ExpansionTile from '../../layoutComponents/expansionTile/expansionTile';
import { RootState } from '../../../../../state/store';
import { useDeleteAccount, useDeleteGoals, useFeedback, useUpdate } from '../../../../../api/apis';
import UpdateDetailsModal from '../../layoutComponents/updateDetailsModal/UpdateDetailsModal';
import DeleteConfirmationModal from '../../../../diary/diary/layoutComponents/deleteConfirmationModal/deleteConfirmationModal';
import { showToast } from '../../../../../config/utils';

const SettingsTab = () => {
  const dispatch = useDispatch();
  const { update } = useUpdate();
  const { userMe } = useSelector((state: RootState) => state.userSlice);
  const [isRight, setIsRight] = useState<any>(false);
  const [isAnalysisAllowed, setIsAnalysisAllowed] = useState<any>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [fieldToUpdate, setFieldToUpdate] = useState<string>('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [telephone, setTelephone] = useState('');
  const [news, setNews] = useState('');
  const [error, setError] = useState({
    telephone: {
      isErr: false,
      errText: ''
    },
    news: {
      isErr: false,
      errText: ''
    }
  });
  const { deleteAccount, loading: deleteAccountLoader } = useDeleteAccount();
  const { addFeedback, loading: feedbackLoader } = useFeedback();

  const handleProfileUpdate = async (newValue: string) => {
    const data = {
      [fieldToUpdate.toLowerCase()]: newValue,
    };
    fieldToUpdate === 'firstname'
      ? dispatch(setFirstname(newValue))
      : dispatch(setLastname(newValue));

    try {
      const response = await update(data);
      console.log('Update => ', response.data);
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setModalVisible(false);
    }
  };

  const openModal = (field: string) => {
    setFieldToUpdate(field);
    setModalVisible(true);
  };

  useEffect(() => {
    setIsRight(userMe?.isNotificationsAllowed);
    setIsAnalysisAllowed(userMe?.isAnalysisAllowed);
  }, [userMe?.isNotificationsAllowed, userMe?.isAnalysisAllowed]);

  const toggleCaret = () => {
    const newValue = !isRight;
    setIsRight(newValue);
    dispatch(setNotificationsAllowed(newValue));

    const handleUpdate = () => {
      const data = {
        isNotificationsAllowed: newValue,
      };
      update(data)
        .then(async response => {
          console.log('Update => ', response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };

    handleUpdate();
  };

  const toggleAnalysis = () => {
    const newValue = !isAnalysisAllowed;
    setIsAnalysisAllowed(newValue);
    dispatch(setAnalysisAllowed(newValue));

    const handleUpdate = () => {
      const data = {
        isAnalysisAllowed: newValue,
      };
      update(data)
        .then(async response => {
          console.log('Update => ', response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };

    handleUpdate();
  };

  const deleteAccounts = () => {
    deleteAccount()
      .then(response => {
        if (response) {
          setIsDeleteModalVisible(false);
          showToast("Dein Konto wurde erfolgreich gelöscht.", "success")
          setTimeout(async () => {
            dispatch(actionSetUserJWTToken(null));
            await clearAllAsync();
          }, 400)
        } else {
          console.log('Response not found');
        }
      })
      .catch(error => {
        console.error('Error in delete user:', error);
      });
  };

  const onSubmit = () => {
    const newError = {
      telephone: { isErr: false, errText: '' },
      news: { isErr: false, errText: '' },
    };

    if (!telephone.trim()) {
      newError.telephone = { isErr: true, errText: 'Telefonnummer erforderlich.' };
    }
    if (!news.trim()) {
      newError.news = { isErr: true, errText: 'Nachricht erforderlich.' };
    }

    setError(newError);

    // if (newError.telephone.isErr || newError.news.isErr) {
    //   return;
    // }

    const feedbackData = {
      phoneNumber: telephone,
      text: news,
    };
    addFeedback(feedbackData)
      .then(async response => {
        console.log('response => ', response.data);
        showToast("Dein Feedback wurde erfolgreich gesendet!", "success")
        setTelephone('')
        setNews("");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={GlobalStyles.container}>
      <ExpansionTile
        title="Persönliche Daten"
        icon={<Svgs.setting height={18} width={18} />}>
        {/* Personal data fields */}
        {['E-Mail Adresse', 'Passwort', 'Vorname', 'Nachname'].map(
          (label, index) => (
            <View key={index}>
              <View style={styles.itemContainer}>
                <Text style={styles.label}>{label}</Text>
                {label === 'E-Mail Adresse' && (
                  <Text style={styles.text}>{userMe?.email ? userMe.email : '-'}</Text>
                )}
                {label === 'Passwort' && (
                  <Text style={styles.text}>{'********'}</Text>
                )}
                {label === 'Vorname' && (
                  <Text style={styles.text}>
                    {userMe?.firstname ? userMe?.firstname : '-'}
                  </Text>
                )}
                {label === 'Nachname' && (
                  <Text style={styles.text}>
                    {userMe?.lastname ? userMe?.lastname : '-'}
                  </Text>
                )}
                {(label === 'Nachname' || label === 'Vorname') && (
                  <OutlinedButton
                    title="Ändern"
                    onPress={() => {
                      label === 'Vorname'
                        ? openModal('firstname')
                        : openModal('lastname');
                    }}
                    buttonStyle={styles.outlineButton}
                  />
                )}
              </View>
              <View style={styles.divider} />
            </View>
          ),
        )}
      </ExpansionTile>

      <ExpansionTile
        title="Benachrichtigungen"
        icon={<Svgs.bell height={18} width={18} />}>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Benachrichtigungen</Text>
          <ToggleSwitch
            isOn={isRight}
            onColor={Colors.secondaryColor}
            offColor={Colors.grey}
            labelStyle={styles.switchLabel}
            size="medium"
            onToggle={toggleCaret}
          />
        </View>
      </ExpansionTile>

      <ExpansionTile
        title="Abonnement und Zahlungen"
        icon={<Svgs.subscription height={18} width={18} />}>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>{`Aktuelles Abonnement: \nGRATIS`}</Text>
          <Text style={styles.text}>Gültig bis 17.12.2024</Text>
          <CustomButton
            title="Zahlungsart ändern"
            onPress={() => { }}
            buttonStyle={styles.fillButton}
          />
          <SizedBox height={10} />
          <OutlinedButton
            title="Abonnement ändern"
            onPress={() => { }}
            buttonStyle={styles.outlineButton}
          />
        </View>
      </ExpansionTile>

      <ExpansionTile
        title="Feedback und Support"
        icon={<Svgs.feedback height={18} width={18} />}>
        <View style={GlobalStyles.margin16}>
          <Text
            style={
              styles.feedbackText
            }>{`Schreibe uns eine Nachricht mit \ndeinem Anliegen`}</Text>
          {/* <SizedBox height={20} /> */}

          <Text style={styles.inputTitle}>Telefona*</Text>
          <TextInput
            placeholder="Telefon"
            value={telephone}
            style={styles.input}
            onChangeText={(value) => {
              const numericText = value.replace(/[^0-9]/g, '');
              setTelephone(numericText);
              if (error.telephone.isErr) {
                setError((prev) => ({
                  ...prev,
                  telephone: { isErr: false, errText: '' },
                }));
              }
            }}
          />
          {error.telephone.isErr && <Text style={styles.errorText}>{error.telephone.errText}</Text>}
          <Text style={styles.inputTitle}>Nachricht*</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={[styles.input, { height: 150 }]}
            value={news}
            onChangeText={(value) => {
              setNews(value); if (error.news.isErr) {
                setError((prev) => ({
                  ...prev,
                  news: { isErr: false, errText: '' },
                }));
              }
            }}
          />
          {error.news.isErr && <Text style={styles.errorText}>{error.news.errText}</Text>}
          <SizedBox height={20} />
          <CustomButton
            title="Absenden"
            onPress={onSubmit}
            buttonStyle={styles.sendButton}
          />
        </View>
      </ExpansionTile>

      <ExpansionTile
        title="Professionelle Hilfe"
        icon={<Svgs.help height={18} width={18} />}>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>{`Telefonnummer / Seelsorge`}</Text>
          <Text style={styles.label}>{`1230913812471`}</Text>
        </View>
      </ExpansionTile>

      <ExpansionTile
        title="Sicherheit und Datenschutz"
        icon={<Svgs.lock height={18} width={18} />}>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Nutzungsanalyse</Text>
          <ToggleSwitch
            isOn={isAnalysisAllowed}
            onColor={Colors.secondaryColor}
            offColor={Colors.grey}
            labelStyle={styles.switchLabel}
            size="medium"
            onToggle={toggleAnalysis}
          />
        </View>
      </ExpansionTile>

      <ExpansionTile
        title="Ausloggen"
        icon={<Svgs.logout height={15} width={15} />}
        islogin={true}>
        <View style={styles.itemContainer}>
          <OutlinedButton
            title="Abmelden"
            onPress={async () => {
              dispatch(actionSetUserJWTToken(null));
              await clearAllAsync();
            }}
            textStyle={styles.logoutText}
            buttonStyle={styles.logoutButton}
          />
          <SizedBox height={20} />
          <Text style={styles.deleteAccountText} onPress={() => setIsDeleteModalVisible(true)}>Konto löschen</Text>
        </View>
      </ExpansionTile>

      <SizedBox height={120} />

      <UpdateDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={`${fieldToUpdate === 'firstname' ? 'Vorname' : 'Nachname'
          } aktualisieren`}
        placeholder={`Enter new ${fieldToUpdate === 'firstname' ? 'vorname' : 'nachname'
          }`}
        onSubmit={handleProfileUpdate}
      />

      <DeleteConfirmationModal title='Konto' isVisible={isDeleteModalVisible} onClose={() => setIsDeleteModalVisible(false)} onConfirmDelete={deleteAccounts} />
    </View>
  );
};

export default SettingsTab;

import * as React from 'react';
import {StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useController} from 'react-hook-form';
import {Text} from './Text';
import {useTheme} from './theme';
import {View} from './View';
import {format} from 'date-fns';

type Props = {
  label: string;
  control: any;
  name: string;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    fontSize: 16,
  },
});

export const InputDate: React.FC<Props> = ({label, control, name}) => {
  const {colors} = useTheme();

  const [modalOpen, setModalOpen] = React.useState(false);

  const {field, fieldState} = useController({
    control,
    name,
  });

  console.log('field.value: ', field.value);

  return (
    <View marginBottom="m" width="100%">
      {label && (
        <Text variant="label" color="neutral900" ml="m">
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => setModalOpen(true)}
        style={[styles.input, {borderColor: colors.neutral300}]}>
        <Text fontSize={16}>
          {field.value && format(field.value, 'MMMM d yyyy')}
        </Text>
      </TouchableOpacity>
      <DatePicker
        mode="date"
        modal
        open={modalOpen}
        date={field.value}
        onConfirm={newDate => {
          setModalOpen(false);
          field.onChange(newDate);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
        maximumDate={new Date()}
      />
    </View>
  );
};

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function Year(props) {
  const {
    year,
    currentMonth,
    currentYear,
    styles,
    onSelectYear,
    textStyle,
    minDate,
    maxDate,
  } = props;

  let yearOutOfRange;
  let yearIsBeforeMin = false;
  let yearIsAfterMax = false;
  let yearIsDisabled = false;

  // Check whether year is outside of min/max range.
  if (maxDate) {
    yearIsAfterMax = year > maxDate.year();
  }
  if (minDate) {
    yearIsBeforeMin = year < minDate.year();
  }

  // ToDo: disabledYears props to disable years separate from disabledDates

  yearOutOfRange = yearIsAfterMax || yearIsBeforeMin || yearIsDisabled;

  const onSelect = () => {
    // Guard against navigating to months beyond min/max dates.
    let month = currentMonth;
    let currentMonthYear = moment({year: currentYear, month});
    if (maxDate && currentMonthYear.isAfter(maxDate, 'month')) {
      month = maxDate.month();
    }
    if (minDate && currentMonthYear.isBefore(minDate, 'month')) {
      month = minDate.month();
    }
    onSelectYear({month, year});
  };

  return (
    <View style={[styles.yearContainer]}>
      { !yearOutOfRange ?
        <TouchableOpacity
          onPress={onSelect}>
          <Text style={[styles.yearText, textStyle,{...year==moment().get("year")?{ backgroundColor:"green",paddingHorizontal:10,paddingVertical:8,borderRadius:8,color:"#fff"}:{paddingHorizontal:10,paddingVertical:8}}]}>
            { year }
          </Text>
        </TouchableOpacity>
        :
        <Text style={[textStyle, styles.disabledText,{paddingHorizontal:10,paddingVertical:8}]}>
          { year }
        </Text>
      }
    </View>
  );
}

Year.propTypes = {
  styles: PropTypes.shape({}),
  year: PropTypes.number,
  onSelectYear: PropTypes.func,
};

import React from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { stylePropType } from "./localPropTypes";

export default function MonthsHeader(props) {
  const { styles, textStyle, headingLevel, title, onPressYear } = props;

  const accessibilityProps = { accessibilityRole: "header" };
  if (Platform.OS === "web") {
    accessibilityProps["aria-level"] = headingLevel;
  }

  return (
    <TouchableOpacity onPress={onPressYear} style={styles.headerWrapper}>
      <Text style={[styles.monthsHeaderText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

MonthsHeader.propTypes = {
  styles: stylePropType,
  textStyle: stylePropType,
  title: PropTypes.string,
};

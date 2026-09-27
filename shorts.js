import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Shorts() {
  return (
    <View style={styles.root}>
      <View style={styles.top}><Text style={styles.title}>Shorts</Text><Ionicons name="camera" size={25} color="#fff" /></View>
      <View style={styles.video}>
        <View style={styles.center}><Ionicons name="play" size={50} color="#fff" /><Text style={styles.hint}>Your vertical video feed will appear here</Text></View>
        <View style={styles.side}>
          <Ionicons name="heart-outline" size={30} color="#fff" /><Text style={styles.count}>0</Text>
          <Ionicons name="chatbubble-outline" size={30} color="#fff" /><Text style={styles.count}>0</Text>
          <Ionicons name="share-social-outline" size={30} color="#fff" />
        </View>
      </View>
      <Pressable style={styles.back} onPress={() => router.push("/home")}><Ionicons name="arrow-back" size={24} color="#fff"/></Pressable>
    </View>
  );
}
const styles=StyleSheet.create({
  root:{flex:1,backgroundColor:"#000"},top:{position:"absolute",top:48,left:18,right:18,zIndex:2,flexDirection:"row",justifyContent:"space-between"},title:{color:"#fff",fontSize:22,fontWeight:"800"},
  video:{flex:1,backgroundColor:"#111",justifyContent:"center",alignItems:"center"},center:{alignItems:"center",gap:12},hint:{color:"#aaa"},side:{position:"absolute",right:18,bottom:100,alignItems:"center",gap:10},count:{color:"#fff",marginBottom:12},back:{position:"absolute",top:48,left:18}
});

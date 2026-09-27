import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomNav } from "./home";

export default function Videos() {
  const data = ["Creator Spotlight", "Music Sessions", "Learning on Connect", "Trending Today"];
  return <View style={styles.root}>
    <View style={styles.header}><Text style={styles.title}>Videos</Text><Ionicons name="search" size={25} color="#fff"/></View>
    <ScrollView contentContainerStyle={styles.content}>
      {data.map((x,i)=><Pressable style={styles.videoCard} key={x}>
        <View style={styles.thumb}><Ionicons name="play-circle" size={50} color="#fff"/></View>
        <View style={styles.info}><Text style={styles.name}>{x}</Text><Text style={styles.muted}>Connect Creator • {120+i*50} views</Text></View>
      </Pressable>)}
    </ScrollView>
    <BottomNav active="video"/>
  </View>
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:"#000"},header:{height:62,padding:18,flexDirection:"row",alignItems:"center",justifyContent:"space-between",borderBottomWidth:1,borderBottomColor:"#1b1b1b"},title:{color:"#fff",fontSize:22,fontWeight:"800"},content:{padding:14,paddingBottom:90},videoCard:{marginBottom:16},thumb:{height:190,borderRadius:12,backgroundColor:"#151515",alignItems:"center",justifyContent:"center"},info:{paddingTop:9},name:{color:"#fff",fontWeight:"700",fontSize:16},muted:{color:"#777",marginTop:3,fontSize:12}});

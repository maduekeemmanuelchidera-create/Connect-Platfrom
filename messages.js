import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomNav } from "./home";

export default function Messages() {
  const chats = ["Connect Team", "Music Hub", "Friends Group", "Creator Support"];
  return <View style={styles.root}>
    <View style={styles.header}><Text style={styles.title}>Messages</Text><Ionicons name="create-outline" size={25} color="#fff"/></View>
    <View style={styles.search}><Ionicons name="search" size={18} color="#777"/><TextInput placeholder="Search messages" placeholderTextColor="#666" style={styles.input}/></View>
    <ScrollView contentContainerStyle={styles.content}>
      {chats.map((x,i)=><Pressable style={styles.chat} key={x}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{x[0]}</Text></View>
        <View style={{flex:1}}><Text style={styles.name}>{x}</Text><Text style={styles.muted}>{i===0?"Welcome to Connect": "Tap to open conversation"}</Text></View>
        <Text style={styles.time}>Now</Text>
      </Pressable>)}
    </ScrollView>
    <BottomNav active="chat"/>
  </View>
}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:"#000"},header:{height:62,padding:18,flexDirection:"row",alignItems:"center",justifyContent:"space-between",borderBottomWidth:1,borderBottomColor:"#1b1b1b"},title:{color:"#fff",fontSize:22,fontWeight:"800"},search:{margin:14,height:44,borderRadius:12,backgroundColor:"#121212",flexDirection:"row",alignItems:"center",paddingHorizontal:13,gap:8},input:{flex:1,color:"#fff"},content:{paddingHorizontal:14,paddingBottom:90},chat:{flexDirection:"row",alignItems:"center",gap:12,paddingVertical:14,borderBottomWidth:1,borderBottomColor:"#171717"},avatar:{width:48,height:48,borderRadius:24,backgroundColor:"#222",alignItems:"center",justifyContent:"center"},avatarText:{color:"#fff",fontSize:18,fontWeight:"800"},name:{color:"#fff",fontWeight:"700"},muted:{color:"#777",marginTop:3},time:{color:"#666",fontSize:11}});

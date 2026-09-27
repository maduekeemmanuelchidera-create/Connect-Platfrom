import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomNav } from "./home";

export default function Profile() {
  return <View style={styles.root}>
    <View style={styles.header}><Text style={styles.title}>Profile</Text><Ionicons name="settings-outline" size={25} color="#fff"/></View>
    <View style={styles.profile}>
      <View style={styles.avatar}><Text style={styles.avatarText}>C</Text></View>
      <Text style={styles.name}>Connect User</Text><Text style={styles.handle}>@connectuser</Text>
      <Text style={styles.bio}>Share. Watch. Message. Connect.</Text>
      <View style={styles.stats}><Stat n="0" l="Posts"/><Stat n="0" l="Followers"/><Stat n="0" l="Following"/></View>
      <Pressable style={styles.edit}><Text style={styles.editText}>Edit Profile</Text></Pressable>
    </View>
    <BottomNav active="person"/>
  </View>
}
function Stat({n,l}){return <View style={{alignItems:"center"}}><Text style={styles.statN}>{n}</Text><Text style={styles.muted}>{l}</Text></View>}
const styles=StyleSheet.create({root:{flex:1,backgroundColor:"#000"},header:{height:62,padding:18,flexDirection:"row",alignItems:"center",justifyContent:"space-between",borderBottomWidth:1,borderBottomColor:"#1b1b1b"},title:{color:"#fff",fontSize:22,fontWeight:"800"},profile:{alignItems:"center",paddingTop:28},avatar:{width:100,height:100,borderRadius:50,backgroundColor:"#161616",borderWidth:1,borderColor:"#444",alignItems:"center",justifyContent:"center"},avatarText:{color:"#fff",fontSize:38,fontWeight:"800"},name:{color:"#fff",fontSize:21,fontWeight:"800",marginTop:14},handle:{color:"#777",marginTop:3},bio:{color:"#bbb",marginTop:15},stats:{flexDirection:"row",gap:45,marginTop:25},statN:{color:"#fff",fontSize:18,fontWeight:"800"},muted:{color:"#777",fontSize:12,marginTop:3},edit:{marginTop:25,borderWidth:1,borderColor:"#555",borderRadius:10,paddingHorizontal:30,paddingVertical:10},editText:{color:"#fff",fontWeight:"700"}});

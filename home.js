import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const posts = [
  { id: 1, name: "Connect Creator", text: "Welcome to Connect — one place to share, watch and connect.", likes: 128, comments: 24 },
  { id: 2, name: "Music Hub", text: "Discover new creators and fresh videos today.", likes: 76, comments: 11 }
];

export default function Home() {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.brand}>
          <Image source={require("../assets/connect-logo.png")} style={styles.logo} />
          <Text style={styles.title}>Connect</Text>
        </View>
        <Pressable><Ionicons name="search" size={25} color="#fff" /></Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.storyRow}>
          {["Your Story", "Creators", "Music", "Friends"].map((x, i) => (
            <View style={styles.story} key={x}>
              <View style={styles.storyCircle}><Text style={styles.storyLetter}>{i === 0 ? "+" : x[0]}</Text></View>
              <Text style={styles.storyText}>{x}</Text>
            </View>
          ))}
        </View>

        {posts.map(p => (
          <View style={styles.card} key={p.id}>
            <View style={styles.userRow}>
              <View style={styles.avatar}><Text style={styles.avatarText}>{p.name[0]}</Text></View>
              <View><Text style={styles.name}>{p.name}</Text><Text style={styles.muted}>Just now</Text></View>
            </View>
            <Text style={styles.postText}>{p.text}</Text>
            <View style={styles.actions}>
              <Text style={styles.action}>♡ {p.likes}</Text>
              <Text style={styles.action}>💬 {p.comments}</Text>
              <Text style={styles.action}>↗ Share</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <BottomNav active="home" />
    </View>
  );
}

export function BottomNav({ active }) {
  const items = [
    ["home", "home", "/home"],
    ["play", "play-circle", "/shorts"],
    ["video", "videocam", "/videos"],
    ["chat", "chatbubbles", "/messages"],
    ["person", "person", "/profile"]
  ];
  return (
    <View style={styles.nav}>
      {items.map(([key, icon, route]) => (
        <Pressable key={key} style={styles.navItem} onPress={() => require("expo-router").router.push(route)}>
          <Ionicons name={icon} size={23} color={active === key ? "#fff" : "#777"} />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root:{flex:1,backgroundColor:"#000"},
  header:{height:62,paddingHorizontal:18,flexDirection:"row",alignItems:"center",justifyContent:"space-between",borderBottomWidth:1,borderBottomColor:"#1b1b1b"},
  brand:{flexDirection:"row",alignItems:"center",gap:9},
  logo:{width:34,height:34,borderRadius:8},
  title:{color:"#fff",fontSize:22,fontWeight:"800"},
  content:{padding:14,paddingBottom:90},
  storyRow:{flexDirection:"row",gap:16,paddingVertical:14},
  story:{alignItems:"center",width:65},
  storyCircle:{width:54,height:54,borderRadius:27,borderWidth:1,borderColor:"#fff",alignItems:"center",justifyContent:"center"},
  storyLetter:{color:"#fff",fontWeight:"700"},
  storyText:{color:"#aaa",fontSize:11,marginTop:5},
  card:{backgroundColor:"#0e0e0e",borderRadius:14,padding:15,marginBottom:14,borderWidth:1,borderColor:"#1b1b1b"},
  userRow:{flexDirection:"row",alignItems:"center",gap:10,marginBottom:12},
  avatar:{width:40,height:40,borderRadius:20,backgroundColor:"#222",alignItems:"center",justifyContent:"center"},
  avatarText:{color:"#fff",fontWeight:"800"},
  name:{color:"#fff",fontWeight:"700"},
  muted:{color:"#777",fontSize:11},
  postText:{color:"#ddd",fontSize:15,lineHeight:22,marginBottom:16},
  actions:{flexDirection:"row",justifyContent:"space-between"},
  action:{color:"#aaa"},
  nav:{position:"absolute",bottom:0,left:0,right:0,height:68,backgroundColor:"#050505",borderTopWidth:1,borderTopColor:"#1c1c1c",flexDirection:"row",justifyContent:"space-around",alignItems:"center"},
  navItem:{padding:15}
});

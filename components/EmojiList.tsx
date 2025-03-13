import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Platform, Pressable } from 'react-native';
import { Image, type ImageSource } from 'expo-image';
import { Asset } from "expo-asset"

type Props = {
  onSelect: (image: ImageSource) => void;
  onCloseModal: () => void;
}

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const emojiImages = [
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
  ];

  const [emoji, setEmoji] = useState<string[]>([]);

  useEffect(() => {
    // 预加载图片资源
    const loadAssets = async () => {
      const assetUris = emojiImages.map((img) => Asset.fromModule(img).uri);
      setEmoji(assetUris);
    };

    loadAssets();
  }, [])

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emoji}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          key={index}
          onPress={() => {
            onSelect( {uri: item});
            onCloseModal();
          }}>
          <Image source={{ uri: item }}  style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  }
})
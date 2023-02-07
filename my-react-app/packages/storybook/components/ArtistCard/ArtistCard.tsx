import React from 'react';
import { Layout, LayoutProps, Text } from '@ui-kitten/components';
import { Image, ImageProps, ImageSourcePropType, View, ViewProps } from 'react-native';

type ArtistCardProps = {
  backgroundColor?: string;
  image: ImageSourcePropType;
  title?: string;
  subtitle?: string;
  ImageContainerStyle?: LayoutProps['style'];
  ImageStyle?: ImageProps['style'];
  ContainerStyle?: ViewProps['style'];
};

const ArtistCard: React.FC<ArtistCardProps> = ({
  backgroundColor,
  image,
  title,
  subtitle,
  ContainerStyle,
  ImageContainerStyle,
  ImageStyle,
}) => {
  ImageContainerStyle;
  return (
    <View style={ContainerStyle}>
      <Layout
        level={'1'}
        style={[
          { backgroundColor, justifyContent: 'flex-end', alignItems: 'center' },
          ImageContainerStyle,
        ]}
      >
        <Image source={image} style={[{ resizeMode: 'cover' }, ImageStyle]} />
      </Layout>
      <View>
        {title && (
          <Text category="s1" style={{ marginVertical: 10 }}>
            {title}
          </Text>
        )}
        {subtitle && <Text appearance={'hint'}>{subtitle}</Text>}
      </View>
    </View>
  );
};

export default ArtistCard;

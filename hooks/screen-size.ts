import { useWindowDimensions } from "react-native";

// Constantes para los breakpoints
const SIZE_SMALL = 320;
const SIZE_MEDIUM = 640;
const SIZE_LARGE = 768;
const SIZE_XLARGE = 1024;

// Funciones para determinar el tamaño de pantalla
const useScreenSize = () => {
  const window = useWindowDimensions();

  // concrete breakpoints
  const isSmall = window.width < SIZE_MEDIUM;
  const isMedium = window.width >= SIZE_MEDIUM && window.width < SIZE_LARGE;
  const isLarge = window.width >= SIZE_LARGE && window.width < SIZE_XLARGE;
  const isXLarge = window.width >= SIZE_XLARGE && window.width < 1280;
  const isXXLarge = window.width >= 1280;

  // grouped breakpoints (bigger than)
  const isBiggerThanXLarge = window.width >= SIZE_XLARGE;
  const isBiggerThanLarge = window.width >= SIZE_LARGE;
  const isBiggerThanMedium = window.width >= SIZE_MEDIUM;
  const isBiggerThanSmall = window.width >= SIZE_SMALL;

  // grouped breakpoints (smaller than)
  const isSmallerThanXLarge = window.width < SIZE_XLARGE;
  const isSmallerThanLarge = window.width < SIZE_LARGE;
  const isSmallerThanMedium = window.width < SIZE_MEDIUM;
  const isSmallerThanSmall = window.width < SIZE_SMALL;

  return { isSmall, isMedium, isLarge, isXLarge, isXXLarge, isBiggerThanXLarge, isBiggerThanLarge, isBiggerThanMedium, isBiggerThanSmall, isSmallerThanXLarge, isSmallerThanLarge, isSmallerThanMedium, isSmallerThanSmall };
}

export default useScreenSize;
import { artwork_data } from "./data";

export const photos_jpg = artwork_data.filter((photo) =>
	photo.image.endsWith(".jpg")
);

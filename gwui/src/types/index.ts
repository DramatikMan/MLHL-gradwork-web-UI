export interface Category {
    uid: number;
    title: string;
}

export type ColorRGB =
    | "#FF0000" // red
    | "#FF8000"
    | "#FFFF00" // yellow
    | "#80FF00"
    | "#00FF00" // green
    | "#00FF80"
    | "#00FFFF" // cyan
    | "#0080FF"
    | "#0000FF" // blue
    | "#8000FF"
    | "#FF00FF" // magenta
    | "#FF0080";

export type ColorRYB =
    | "#FE2712" // red
    | "#FC600A" // red-orange
    | "#FB9902" // orange
    | "#FCCC1A" // yellow-orange
    | "#FEFE33" // yellow
    | "#B2D732" // yellow-green
    | "#66B032" // green
    | "#347C98" // blue-green
    | "#0247FE" // blue
    | "#4424D6" // blue-purple
    | "#8601AF" // purple
    | "#C21460"; // red-purple

export interface Image {
    uid: number;
    path: string;
    category: Category | null;
    color_RGB: ColorRGB | null;
    color_RYB: ColorRYB | null;
    link: string;
}

export interface APIError<Extra extends object = object> {
    detail: string;
    extra: Extra | null;
}

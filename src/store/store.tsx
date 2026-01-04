import {create} from 'zustand';

interface MapState {
    coords: {id: number, name: string, city: string, lat: number, lng: number}[];
    current: string;
    station:string;
    setCoords: (newCoords: {id: number, name: string, city: string, lat: number, lng: number}[]) => void;
    setCurrent: (newCurrent: string) => void;
    setStation: (newCurrent: string) => void;
    addCoord: (coord: {id: number, name: string, city: string, lat: number, lng: number}) => void;
}

const useMap = create<MapState>((set) => ({
    coords: [],
    current: 'all',
    station: 'all',
    setCoords: (newCoords:{id: number, name: string, city: string, lat: number, lng: number}[]) => set({ coords: newCoords }),
    setCurrent: (newCurrent:string) => set({ current: newCurrent }),
    setStation: (newCurrent:string) => set({ station: newCurrent }),
    addCoord: (coord:{id: number, name: string, city: string, lat: number, lng: number}) => set((state:{coords:{id: number, name: string, city: string, lat: number, lng: number}[]}) => ({ coords: [...state.coords, coord] })),
}));


export default useMap

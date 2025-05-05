// Dark only
import { abyss } from '@uiw/codemirror-theme-abyss';
import { andromeda } from '@uiw/codemirror-theme-andromeda';
import { copilot } from '@uiw/codemirror-theme-copilot'
import { atomone } from '@uiw/codemirror-theme-atomone';
import { aura } from '@uiw/codemirror-theme-aura'
import { dracula } from '@uiw/codemirror-theme-dracula'
import { monokai } from '@uiw/codemirror-theme-monokai'
import { nord } from '@uiw/codemirror-theme-nord'
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm'

// light
import { tokyoNightDay } from '@uiw/codemirror-theme-tokyo-night-day';

// Both
import { duotoneLight, duotoneDark } from '@uiw/codemirror-theme-duotone'
import { materialLight, materialDark } from '@uiw/codemirror-theme-material'
import { vscodeLight, vscodeDark } from '@uiw/codemirror-theme-vscode'
import { xcodeLight, xcodeDark } from '@uiw/codemirror-theme-xcode'
import { basicDark, basicLight } from '@uiw/codemirror-theme-basic'
import { gruvboxLight, gruvboxDark } from '@uiw/codemirror-theme-gruvbox-dark'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'



export const codeMirrorThemes = {
    // Dark-only themes
    abyss: abyss,
    andromeda: andromeda,
    copilot: copilot,
    atomone: atomone,
    aura: aura,
    dracula: dracula,
    monokai: monokai,
    nord: nord,
    tokyoNightStorm: tokyoNightStorm,

    // Light-only themes
    tokyoNightDay: tokyoNightDay,

    // Dual-mode themes
    duotoneLight: duotoneLight,
    duotoneDark: duotoneDark,

    materialLight: materialLight,
    materialDark: materialDark,

    vscodeLight: vscodeLight,
    vscodeDark: vscodeDark,

    xcodeLight: xcodeLight,
    xcodeDark: xcodeDark,

    basicLight: basicLight,
    basicDark: basicDark,

    gruvboxLight: gruvboxLight,
    gruvboxDark: gruvboxDark,

    tokyoNight: tokyoNight, // usable in both modes
};

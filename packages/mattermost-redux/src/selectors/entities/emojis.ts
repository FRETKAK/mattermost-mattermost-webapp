// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {createSelector} from 'reselect';

import {getConfig} from 'mattermost-redux/selectors/entities/general';

import {CustomEmoji} from 'mattermost-redux/types/emojis';
import {GlobalState} from 'mattermost-redux/types/store';
import {IDMappedObjects} from 'mattermost-redux/types/utilities';

import {createIdsSelector} from 'mattermost-redux/utils/helpers';

export const getCustomEmojis: (state: GlobalState) => IDMappedObjects<CustomEmoji> = createSelector(
    'getCustomEmojis',
    (state) => getConfig(state)?.EnableCustomEmoji === 'true',
    (state) => state.entities.emojis.customEmoji,
    (customEmojiEnabled, customEmoji) => {
        if (!customEmojiEnabled) {
            return {};
        }

        return customEmoji;
    },
);

export const getCustomEmojisAsMap: (state: GlobalState) => Map<string, CustomEmoji> = createSelector(
    'getCustomEmojisAsMap',
    getCustomEmojis,
    (emojis) => {
        const map = new Map();
        Object.keys(emojis).forEach((key: string) => {
            map.set(key, emojis[key]);
        });
        return map;
    },
);

export const getCustomEmojisByName: (state: GlobalState) => Map<string, CustomEmoji> = createSelector(
    'getCustomEmojisByName',
    getCustomEmojis,
    (emojis: IDMappedObjects<CustomEmoji>): Map<string, CustomEmoji> => {
        const map: Map<string, CustomEmoji> = new Map();

        Object.keys(emojis).forEach((key: string) => {
            map.set(emojis[key].name, emojis[key]);
        });

        return map;
    },
);

export const getCustomEmojiIdsSortedByName: (state: GlobalState) => string[] = createIdsSelector(
    'getCustomEmojiIdsSortedByName',
    getCustomEmojis,
    (emojis: IDMappedObjects<CustomEmoji>): string[] => {
        return Object.keys(emojis).sort(
            (a: string, b: string): number => emojis[a].name.localeCompare(emojis[b].name),
        );
    },
);

import * as DB from "../db";
import * as ModesNotice from "../elements/modes-notice";

export function saveActiveToLocalStorage(): void {
  const tags: string[] = [];

  try {
    DB.getSnapshot()?.tags?.forEach((tag) => {
      if (tag.active === true) {
        tags.push(tag._id);
      }
    });
    window.localStorage.setItem("activeTags", JSON.stringify(tags));
  } catch {}
}

export function clear(nosave = false): void {
  const snapshot = DB.getSnapshot();
  if (!snapshot) return;

  snapshot.tags = snapshot.tags?.map((tag) => {
    tag.active = false;

    return tag;
  });

  DB.setSnapshot(snapshot);
  ModesNotice.update();
  if (!nosave) saveActiveToLocalStorage();
}

export function set(tagid: string, state: boolean, nosave = false): void {
  const snapshot = DB.getSnapshot();
  if (!snapshot) return;

  snapshot.tags = snapshot.tags?.map((tag) => {
    if (tag._id === tagid) {
      tag.active = state;
    }

    return tag;
  });

  DB.setSnapshot(snapshot);
  ModesNotice.update();
  if (!nosave) saveActiveToLocalStorage();
}

export function toggle(tagid: string, nosave = false): void {
  DB.getSnapshot()?.tags?.forEach((tag) => {
    if (tag._id === tagid) {
      tag.active = tag.active === undefined ? true : !tag.active;
    }
  });
  ModesNotice.update();
  if (!nosave) saveActiveToLocalStorage();
}

export function loadActiveFromLocalStorage(): void {
  let newTags: string[] | string = window.localStorage.getItem(
    "activeTags"
  ) as string;
  if (newTags != undefined && newTags !== "") {
    try {
      newTags = JSON.parse(newTags) ?? [];
    } catch {
      newTags = [];
    }
    for (const ntag of (newTags as string[])) {
      toggle(ntag, true);
    }
    saveActiveToLocalStorage();
  }
}

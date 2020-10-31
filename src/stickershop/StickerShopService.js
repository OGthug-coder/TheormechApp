class StickerShopService {
    constructor(api) {
        this.api = api;
    }

    getAllStickers() {
        return this.api.requestStickers();
    }

    setActiveSticker(userId, stickerId) {
        return this.api.setActiveSticker(userId, stickerId);
    }

    vibrate() {
        this.api.vibrateSelectionChanged();
    }

    vibrateImpact(type) {
        this.api.vibrateImpact(type);
    }

    buySticker(userId, stickerId) {
        return this.api.buySticker(userId, stickerId);
    }

    saveSticker(sticker) {
        return this.api.saveSticker(sticker);
    }

    deleteSticker(id) {
        return this.api.deleteSticker(id);
    }

}

export default StickerShopService;
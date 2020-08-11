class StickerShopService {
    constructor(api) {
        this.api = api;
    }

    getAllStickers() {
        return this.api.requestStickers();
    }

}

export default StickerShopService;
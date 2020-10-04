import React from 'react'
import SalesContract from '../pages/Payment/SalesContract'

const exJson = { "profile": { "favoriteProducts": ["5f4a59b7ab707d001e2b6d8e", "5f4ac98249f2e8001e07af7e", "5f4cd31fb6bd8b0029fc89bf", "5f5618d00fe130001e99a507", "5f5fc6813339ef001e93a691"], "cardUserKey": "KlUyzZoObC3QfqQG3pfR+zy+k5A=", "_id": "5f4a681fbb621e001ed86617", "phoneNumber": "0555 555 55 55", "nameSurname": "İsim soyisim", "email": "test2@hotmail.com", "password": "$2b$10$9dGor1kIpM7TVsoNw6Sj8eYiBgkBfGz8AMmY8XJR8bwfr/aLX.Une", "addresses": [{ "_id": "5f6f41bbd73f80001e44fc3b", "openAddress": "Fatih/İstanbul, Turkey", "addressTitle": "Home" }], "createdAt": "2020-08-29T14:37:19.478Z", "updatedAt": "2020-10-03T23:35:20.059Z", "__v": 0, "alias": "ad" }, "products": [{ "color": { "name": "104", "code": "#C4807E" }, "image": 19, "imageCount": 1, "purchasable": true, "_id": "5f561c060fe130001e99a513", "specifications": [{ "_id": "5f589c783e2cf0001e58e1c2", "name": "Çeşit", "value": "Tekli", "slug": "cesit" }, { "_id": "5f589c783e2cf0001e58e1c3", "name": "Bitiş", "value": "Mat", "slug": "bitis" }, { "_id": "5f589c783e2cf0001e58e1c4", "name": "Form", "value": "Likit", "slug": "form" }, { "_id": "5f589c783e2cf0001e58e1c5", "name": "Renk Tonu", "value": "Kahverengi", "slug": "renk-tonu" }], "categoryId": "5f4a56a6ab707d001e2b6d84", "subCategoryId": "5f4a57fabb621e001ed86608", "type": "5f4ac317b37e96001e971dcd", "name": "Golden Rose Soft & Matte Creamy Lipcolor Ruj NO:104", "details": "• Soft & Matte Creamy LipColor; yumuşak, mat, kremsi ve yoğun renk veren yapısı ile dudaklarınıza gün boyu mükemmel bir görünüm kazandırır.\n• Dudaklarınızı yumuşak ve esnek kalmasını sağlayan Jojoba ve Avokado yağı ile zenginleştirilmiş, kolay uygulanabilen kremsi formülü ile dudaklarınızı kurutmadan uzun süre kalır.", "brand": "Golden Rose", "price": 39.75, "slug": "golden-rose-soft-and-matte-creamy-lipcolor-ruj-no104", "colorGroup": "5f561c060fe130001e99a513", "__v": 0, "quantity": 2, "paidPrice": 39.75 }, { "color": { "name": "04", "code": "#F2F2F2" }, "image": 84, "imageCount": 1, "purchasable": true, "_id": "5f5e7f153339ef001e93a4bd", "specifications": [{ "_id": "5f5e809f3339ef001e93a4cc", "name": "Bitiş", "value": "Doğal", "slug": "bitis" }, { "_id": "5f5e809f3339ef001e93a4cd", "name": "Ürün Tipi", "value": "Asansörsüz", "slug": "urun-tipi" }, { "_id": "5f5e809f3339ef001e93a4ce", "name": "Renk Tonu", "value": "Beyaz", "slug": "renk-tonu" }], "categoryId": "5f4a56a6ab707d001e2b6d84", "subCategoryId": "5f4a57f3bb621e001ed86607", "type": "5f4a5872ab707d001e2b6d89", "name": "essence Kajal Pencil 04", "details": "Çılgın renkler! essence kajal göz kalemi ile gözlerde eşsiz stillerin garantisi havalı son moda renkler.", "colorGroup": "5f5e7ec93339ef001e93a4b8", "brand": "essence", "price": 9.5, "slug": "essence-kajal-pencil-04", "__v": 0, "quantity": 1, "paidPrice": 9.5 }, { "image": 236, "imageCount": 3, "purchasable": true, "_id": "5f5fc6813339ef001e93a691", "categoryId": "5f4a56afab707d001e2b6d85", "subCategoryId": "5f4ac8ca49f2e8001e07af7b", "type": "5f5fc479376b7d001ee0ed36", "name": "Nivea Cellular Filler Sıkılaştırıcı Göz Kremi 15 ml", "details": "• Nivea Cellular Cilt Gençleştirici Göz Kremi hafif formülü hassas göz çevresi için özel olarak üretilmiştir.\n• İçeriğindeki kısa-zincir hyaluronik asit, manolya özü ve kreatin; genç cildin göstergesi olan cildin kendi yenilenme hızını artırır.", "brand": "Nivea", "price": 140, "slug": "nivea-cellular-filler-sikilastirici-goz-kremi-15-ml", "specifications": [], "colorGroup": "5f5fc6813339ef001e93a691", "__v": 0, "quantity": 1, "paidPrice": 140 }], "address": { "_id": "5f6f41bbd73f80001e44fc3b", "openAddress": "Fatih/İstanbul, Turkey", "addressTitle": "Home" } }


class DeletThisPage extends React.Component { // TODO

  state = {
    showSalesContractPopup: true
  }

  hideSalesContractPopup = () => { }

  render() {
    return (
      <>
        {
          this.state.showSalesContractPopup && (
            <SalesContract
              hideSalesContractPopup={this.hideSalesContractPopup}
              profile={exJson.profile}
              products={exJson.products}
              address={exJson.address}
            />
          )
        }
      </>
    )
  }
}

export default DeletThisPage
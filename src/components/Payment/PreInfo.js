import React from 'react'

import PopupWrapper from '../PopupWrapper'

class MembershipAgreement extends React.Component {
    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }

        this.props.hidePreInfoPopup()
    }

    onCloseClick = (event) => {
        this.props.hidePreInfoPopup()
    }

    render() {// TODO REVIEW
        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
                <div className='col-md-12 d-flex'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <p className='p-lg-5' style={{ whiteSpace: 'break-spaces' }}>
                                <h2 className='text-black text-center mb-5'>Ön Bilgilendirme Formu</h2>

                                <h5 className='text-black mb-5'>A - Satıcı Bilgileri ve Alıcı Bilgileri</h5>
                                <p><b className='text-black'>1 - Ünvan: Silfavell</b></p>
                                <p style={{ whiteSpace: 'break-spaces' }}>
                                    {`Adres: Levent Mahallesi, Yapı Kredi Plaza C Blok Cömert Sokak, 1 C Kat:1 34430 Beşiktaş/İstanbul
Telefon: 0 212 705 26 00
Faks: 0 212 284 22 78
Mersis No: 0411035618802101
Müşteri Hizmetleri: 0850 210 6 900
`
                                    }
                                </p>

                                <p><b className='text-black'>2 - Alıcı Adı Soyadı ve Adresi</b></p>
                                <p style={{ whiteSpace: 'break-spaces' }}>
                                    {`Teslim edilecek kişi: Muhammet İpek
Teslimat Adresi: Fatih/Istanbul
Telefon: 5468133198
E-Posta: muhammetipek57@hotmail.com
`
                                    }
                                </p>

                                <h5 className='text-black my-5'>B - Ürüne, Ürünün Satış Fiyatına ve Nakliyesine İlişkin Bilgiler</h5>
                                <p><b className='text-black'>3 - Ürün Bilgileri</b></p>

                                <table class='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Ürün Adı</th>
                                            <th scope='col'>Ürün Adeti</th>
                                            <th scope='col'>Toplam Tutar (KDV dahil)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <td colspan='2'>Kargo Tutarı</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td colspan='2'>Toplam</td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p className='mt-5'><b className='text-black'>4 - Ödeme Yöntemi ve Ödeme Yöntemlerine İlişkin Bilgiler</b></p>

                                <p style={{ whiteSpace: 'break-spaces' }}>
                                    {`Ödeme Yöntemi : Kredi kartı
Kargo ücreti : 7.99 TL
Toplam Sipariş Bedeli : 56.74 TL
Konutta Ödeme
                                `
                                    }
                                </p>

                                <p><b className='text-black'>Ödeme Yöntemleri Hakkında Bilgilendirme</b></p>

                                <p>
                                    Kredi kartı ile yapılan alışverişlerde kullanılan kredi kartının maliki olan Banka’nın taksit uygulamaları, taksit adetleri değişiklik gösterebilir. Alıcı’nın kullandığı kredi kartının maliki olan Banka’nın Alıcıya ek taksit veya ödeme geciktirme gibi uygulamaları Satıcı’nın sorumluluğunda değildir. Bu tür uygulamalar tamamen Banka’nın insiyatifindedir ve Banka ile Alıcı arasındaki Kredi Kartı verilmesine ilişkin sözleşmenin konusudur. Kredi kartı, Banka kartı gibi ödeme vasıtalarının yetkisiz kişilerce kullanımı 5464 Sayılı ve 23.02.2006 tarihli Banka Kartları ve Kredi Kartları Kanunu’na ve 26458 RG. 10.03.2007 tarihli Banka Kartları ve Kredi Kartları Hakkında Kanun’a tabidir.
                                </p>
                                <p>
                                    Alışverişte kredi kartının Alıcının izni ve bilgisi dışında yetkisiz kullanımı söz konusu olmuş ise taşıyıcıya teslim edilmemiş ürün için sipariş iptal edilir ve teslimat yapılmaz.
                                </p>
                                <p>
                                    Eğer ürün telim edilmiş ve Banka bedeli Satıcı dan iade almışsa Alıcı 3 gün içinde nakliye masrafları kendisine ait olmak üzere ürünü Satıcı’ya göndermekle yükümlüdür.
                                </p>
                                <p>
                                    Konutta ödeme seçeneği ile alışveriş yapıldığı zaman alıcı Kargo görevlisinin kendisine ibraz edeceği formları doldurduktan sonra görevliye makbuz karşılığında ödeme yaparak ürünü teslim alabilir.
                                </p>

                                <p>
                                    <b className='text-black'>6 - </b>
                                    Siparişin tamamlanması halinde ve tüketicinin belli bir adrese teslim talep ettiği hallerde ürünler PTT Kargo ile nakledilir. Kargo ücreti alıcı tarafından karşılanır. Kargo fiyatı ürün bedeline dahil değildir. Alıcının veya alıcı adına teslime yetkili kişinin tüketicinin belirttiği adreste bulunmaması veya alıcının teslimat adresi olarak satıcı mağazasını belirlediği durumlarda kendisine teslimat için bildirim yapılmasına rağmen süresinde gelmemesi hallerinde Satıcı edimini eksiksiz ve tam yerine getirmiş sayılır.
                                </p>

                                <p>
                                    <b className='text-black'>7 - </b>
                                    Alıcı tarafından bu ön bilgilendirme formuna konu olan sipariş tamamlandığı andan itibaren satıcı siparişe konu ürünü/ürünleri 30 gün içinde alıcının siparişi oluştururken teslim yeri olarak belirttiği adrese teslimini sağlar.
                                </p>

                                <p>
                                    <b className='text-black'>8 - </b>
                                        Alıcı teslim adresi olarak satıcı mağazasını tercih etmişse satıcı 30 gün içinde ürünü ilgili adrese ulaştırır ve alıcının siparişi oluştururken belirttiği mobil telefondan çağrı veya SMS yoluyla ya da bildirdiği elektronik posta aracılığı ile alıcıyı bilgilendirerek ürünü teslime hazır hale getirir. Alıcının sipariş sırasında belirlediği teslim adresinin değiştirilmesi talebi satıcıyı bağlamaz.
                                    </p>
                                <p>
                                    <b className='text-black'>9 - </b>
                                    Alıcının belirttiği adrese zamanında ve usulüne uygun bir şekilde ürünün teslimi için gerekenler yapıldığı halde, adresin yanlış verilmesi, adreste alıcının veya alıcı adına ürünü kabul edebilecek kimsenin bulunmaması gibi alıcı kaynaklı nedenlerden ötürü ürün teslim alınamadığı takdirde alıcı durumla ilgili bilgilendirilir ve ürünün teslim edilebileceği imkanlar kendisine açıklanır. Alıcı buna rağmen ürünü teslim almaz ise satıcı sözleşmeden döner ve alıcıya tahsil edilmiş satış bedelini tahsil yöntemine uygun bir biçimde derhal iade eder.
                                </p>

                                <p>
                                    <b className='text-black'>10 - </b>
                                    Alıcı teslim adresi olarak satıcı mağazasını tercih etmiş ve siparişi oluştururken belirttiği mobil telefondan çağrı, belirttiği elektronik postasına ileti veya SMS yoluyla bilgilendirilmesine rağmen ürünü teslim almamışsa satıcı sözleşmeden döner ve alıcıya tahsil edilmiş satış bedelini tahsil yöntemine uygun bir biçimde derhal iade eder.
                                </p>

                                <h5 className='text-black my-5'>C - Alıcının Şikayetlerini Satıcıya İletmesi İçin Yöntemler</h5>

                                <p>
                                    <b className='text-black'>11 - </b>
                                    Alıcı bütün kanuni ve sözleşmesel haklarının yanı sıra satıcının elektronik sitesindeki müşteri hizmetleri bölümü ile iletişime geçerek şikayetlerini, eleştirilerini, önerilerini iletebilir.
                                </p>

                                <h5 className='text-black my-5'>E - Cayma Hakkı ve Cayma Hakkının Kullanılmasına İlişkin Hükümler</h5>

                                <p>
                                    <b className='text-black'>12 - </b>
                                    Tüketici ürünün kendisine veya kendisi adına ürünü teslim almaya yetkili kimseye tesliminden itibaren on dört (14) gün içinde herhangi bir neden göstermeksizin sözleşmeden cayabilir. Alıcının tek bir siparişine ilişkin birden fazla teslimat yapılmış ise süre en son malın tesliminden başlar.
                                </p>

                                <p>
                                    <b className='text-black'>13 - </b>
                                    Alıcının cayma hakkını kullanırken cayma hakkına ilişkin bildirimini aşağıdaki yöntemlerin herhangi biri ile satıcıya iletebilir.
                                </p>

                                <p>
                                    <b className='text-black'>a - </b>
                                    Cayma hakkı kullanılırken alıcı, ürünlerin tesliminde kendisine iletilen formu doldurarak kendisine ürünü teslim eden taşıyıcıya ya da Orhanlı Mahallesi, Kazlıçeşme Cd. No:51, 34956 Deri OSB/Tuzla/İstanbul adresine posta ile ya da 0 212 284 22 78 no’lu faks numarasına formu faks göndererek başvurabilir.
                                </p>

                                <p>
                                    <b className='text-black'>b - </b>
                                    Satıcının internet sitesi üyeliği hesabı ile satıcıya ait elektronik ticaret sitesinde mesafeli sözleşme kuran alıcı, internet sitesinde kendi hesabından erişebileceği iade kodunu kullanarak kendisine ürünü teslim eden taşıyıcıya veya satıcının herhangi bir mağazasına başvurabilir.
                                </p>

                                <p>
                                    <b className='text-black'>c - </b>
                                    Alıcı, satıcının elektronik ticaret sitesinde mesafeli sözleşme kurarken herhangi bir üyelik olmadan ziyaretçi olarak alışveriş yapmış ise müşteri hizmetleri hattına ulaşarak cayma bildirimini iletir ve müşteri hizmetleri tarafından siparişte kullanılan elektronik posta hesabına gönderilecek iade kodu birlikte ürünü kendisine teslim eden taşıcıya veya satıcının herhangi bir mağazasına bırakabilir.
                                </p>

                                <p>
                                    <b className='text-black'>13 - </b>
                                    Alıcının yukarıda belirtilen şekilde yukarıda belirtildiği şekilde cayma hakkını kullandığı tarihten itibaren on gün içinde ürünleri kendisine ürünü teslim eden taşıyıcıya veya satıcının herhangi bir mağazasına teslim etmesi zorunludur. Bu süre Alıcının herhangi bir mağazasından başvurularda iade formu doldurup mağazaya teslim etmesinden veya kendisine iade kodu verilmesinden itibaren işlemeye başlar.
                                </p>

                                <p>
                                    <b className='text-black'>14 - </b>
                                    Satıcı cayma hakkına ilişkin bildirimin kendisine ulaştığı tarihten itibaren 14 gün içinde alıcıya varsa malın alıcıya teslim masrafları da dahil olmak üzere tahsil edilen tüm ödemeleri iade eder. Cayma hakkının kullanılamayacağı hallere ilişkin düzenlemeler saklıdır.
                                </p>

                                <p>
                                    <b className='text-black'>15 - </b>
                                    Alıcının bir siparişte birden fazla ürün satın aldığı ve bu ürünlerden biri veya birkaçı için cayma hakkını kullandığı biri veya birkaçı için cayma hakkını kullanmadığı durumlarda alıcıya cayma hakkına konu olan ürünlere yönelik teslim masrafları iade edilir.
                                </p>

                                <p>
                                    <b className='text-black'>16 - </b>
                                    Satıcının düzenli bir uygulaması veya dönemlik bir kampanyası çerçevesinde belli sayıda veya belli bedel üzeri siparişlerde teslim masrafını alıcıya yansıtmadığı bir siparişte alıcı siparişte yer alan bazı ürünler için cayma hakkını kullanır ve ilgili siparişin alıcının cayma hakkına konu edilen ürünler bakımından uygulama veya kampanya dışına çıkması söz konusu olursa alıcıdan cayma hakkına konu olmayan ürünlerin nakliye bedeli cayma hakkı nedeniyle iade edilecek bedelden düşülür. “3 Al 2 Öde”, “1 alana 1 bedava” benzeri kampanyalardan yararlanılarak yapılan siparişlerde Alıcı cayma hakkını kullanmak istediği takdirde bütün ürünlerin iade edilmesi zorunludur. Kampanyalı ürünlerden en az birinin iade edilmemesi durumunda iade edilmeyen ürün veya ürünlerin satış fiyatı toplam alışveriş tutarından mahsup edilir.
                                </p>

                                <p>
                                    <b className='text-black'>17 - </b>
                                    Cayma hakkına konu olan ürünler yukarıda anlatılan yöntemler çerçevesinde kullanılmak şartı ile alıcı ürünleri bizzat satıcının herhangi bir mağazasına teslim ettiği ya da PTT Kargo şubeleri aracılığı ile ürünlerin satıcıya gönderimini sağladığı ihtimallerde alıcıdan ürünlerin satıcıya iadesine ilişkin nakliye masrafı talep edilmez. Burada belirtilen haller ve taşıyıcılar dışında ürün iadelerine ilişkin nakliye masrafından satıcı sorumlu olmaz.
                                </p>

                                <h5 className='text-black my-5'>D - Cayma Hakkının Kullanılmasının Mümkün Olmadığı Haller</h5>

                                <p>
                                    <b className='text-black'>18 - </b>
                                    Alıcı aşağıdaki hallerde cayma hakkını kullanamaz:
                                </p>

                                <p>
                                    <b className='text-black'>- </b>
                                    Fiyatı finansal piyasalardaki dalgalanmalara bağlı olarak değişen ve satıcı veya sağlayıcının kontrolünde olmayan mal veya hizmetlere ilişkin sözleşmeler.
                                </p>

                                <p>
                                    <b className='text-black'>- </b>
                                    Alıcının istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan mallara ilişkin sözleşmeler.
                                </p>

                                <p>
                                    <b className='text-black'>- </b>
                                    Çabuk bozulabilen veya son kullanma tarihi geçebilecek malların teslimine ilişkin sözleşmeler.
                                </p>

                                <p>
                                    <b className='text-black'>- </b>
                                    Tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olan mallardan; iadesi sağlık ve hijyen açısından uygun olmayanların teslimine ilişkin sözleşmeler.
                                </p>

                                <p>
                                    <b className='text-black'>- </b>
                                    Tesliminden sonra başka ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan mallara ilişkin sözleşmeler.
                                </p>

                                <p>
                                    <b className='text-black'>- </b>
                                    Malın tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olması halinde maddi ortamda sunulan kitap, dijital içerik ve bilgisayar sarf malzemelerine ilişkin sözleşmeler.
                                </p>

                                <p>
                                    <b className='text-black'>- </b>
                                    Abonelik sözleşmesi kapsamında sağlananlar dışında, gazete ve dergi gibi süreli yayınların teslimine ilişkin sözleşmeler.
                                </p>

                                <p>
                                    <b className='text-black'>- </b>
                                    Belirli bir tarihte veya dönemde yapılması gereken, konaklama, eşya taşıma, araba kiralama, yiyecek-içecek tedariki ve eğlence veya dinlenme amacıyla yapılan boş zamanın değerlendirilmesine ilişkin sözleşmeler.
                                </p>


                                <p>
                                    <b className='text-black'>- </b>
                                    Elektronik ortamda anında ifa edilen hizmetler veya alıcıya anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler.
                                </p>

                                <p>
                                    <b className='text-black'>- </b>
                                    Cayma hakkı süresi sona ermeden önce, alıcının onayı ile ifasına başlanan hizmetlere ilişkin sözleşmeler.
                                </p>

                                <h5 className='text-black my-5'>F - Uyuşmazlıkların Çözümü</h5>

                                <p>
                                    <b className='text-black'>18 - </b>
                                    Bu önbilgilendirme formunun konusunu oluşturan siparişten ve taraflar arasında kurulacak mesafeli satış sözleşmesinden kaynaklanan uyuşmazlıklarda güncel mevzuattaki parasal sınırlara göre tüketicinin ikamet ettiği ya da tüketicinin işlem yaptığı il/ilçe hakem heyetleri ile satıcının yerleşim yeri veya tüketicinin yerleşim yeri Tüketici Mahkemeleri görevli ve yetkilidirler.
                                </p>
                            </p>
                        </div>
                    </div>
                </div>
            </PopupWrapper >
        )
    }
}

export default MembershipAgreement
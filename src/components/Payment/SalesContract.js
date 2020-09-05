import React from 'react'

import PopupWrapper from '../PopupWrapper'

class MembershipAgreement extends React.Component {
    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }

        this.props.hideSalesContractPopup()
    }

    onCloseClick = (event) => {
        this.props.hideSalesContractPopup()
    }

    render() {// TODO REVIEW

        const totalPrice = this.props.products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.discountedPrice || currentValue.price) * currentValue.quantity, 0).toFixed(2)
        const cargoPrice = (15).toFixed(2)

        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
                <div className='w-100 d-flex'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='p-lg-5' style={{ whiteSpace: 'break-spaces' }}>
                                <h2 className='text-black text-center mb-5'>Mesafeli Satış Sözleşmesi</h2>

                                <h5 className='text-black mb-5'>A - Taraflar ve Tanımlar</h5>

                                <p>
                                    <b className='text-black'>1 - Satıcı: </b>
                                    Bu satış sözleşmesi ( sözleşme) Levent Mahallesi, Yapı Kredi Plaza C Blok Cömert Sokak, 1 C Kat:1 34430 Beşiktaş/İstanbul adresinde yer alan 0411035618802101 Mersis No lu Silfavell ile ( sözleşmenin devam eden metinlerinde satıcı olarak anılacaktır) aşağıda kimlik bilgileri ve adresine yer verilen Alıcı arasında kurulmuştur.
                                </p>

                                <p><b className='text-black'>Alıcı: </b></p>

                                <p style={{ whiteSpace: 'break-spaces' }}>
                                    {`Adı/Soyadı/Ünvanı: ${this.props.profile.nameSurname}
Adresi: ${this.props.address?.openAddress}
Telefon: ${this.props.profile.phoneNumber}
E-Posta: ${this.props.profile.email}
`
                                    }
                                </p>

                                <p>
                                    <b className='text-black'>2 - </b>
                                    Bu sözleşme 6502 sayılı Tüketicinin Korunması Hakkında Kanun’un ( Kanun) ve Mesafeli Sözleşmeler Yönetmeliği ( Yönetmelik) ‘nin emredici hükümlerine riayet ederek taraflar arasındaki satış sözleşmesinden doğan hakları ve borçları belirlemeyi konu edinir. Alıcının tüketici olmadığı ilişkilerde bu sözleşme hükümleri alıcıya satış sözleşmesinin tabi olduğu TBK, TTK hükümlerinde yer almayan ek imkanlar sağlandığı şeklinde yorumlanamaz.
                                </p>

                                <p>Bu sözleşmede geçen terimlerin anlamları aşağıdaki gibidir.</p>

                                <p>
                                    <b className='text-black'>Alıcı: </b>
                                    Bu sözleşmede, bir malı veya hizmeti mesleki olmayan amaçlarla edinen gerçek veya tüzel kişiyi ifade eder.
                                </p>

                                <p>
                                    <b className='text-black'>Kanun: </b>
                                    6502 Sayılı Tüketicinin Korunması Hakkında Kanunu ifade eder.
                                </p>

                                <p>
                                    <b className='text-black'>Yönetmelik: </b>
                                    Mesafeli Sözleşmeler Yönetmeliğini ifade eder.
                                </p>

                                <p>
                                    <b className='text-black'>Ürün: </b>
                                    Alıcı ile Satıcı arasında Satıcıya ait silfavell.com internet adresi kullanılarak kurulan bu mesafeli satış sözleşmesine konu, Satıcı tarafından müşterilere arz edilmiş emtiayı, satış konusunu ifade eder.
                                </p>

                                <h5 className='text-black my-5'>B - Satış Sözleşmesine Konu Olan Ürün, Ödeme</h5>

                                <p>
                                    <b className='text-black'>3 - Ürün Bilgileri</b>
                                </p>

                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>Ürün Adı</th>
                                            <th scope='col'>Ürün Adeti</th>
                                            <th scope='col'>Toplam Tutar (KDV dahil)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.products.map((product) => (
                                                <tr>
                                                    <td>{product.name}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{(product.paidPrice * product.quantity).toFixed(2).replace('.', ',') + ' TL'}</td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td colSpan='2'>Kargo Tutarı</td>
                                            <td>{cargoPrice + ' TL'}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan='2'>Toplam</td>
                                            <td>{totalPrice + ' TL'}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p className='mt-5'><b className='text-black'>4 - Ödeme Yöntemi ve Ödeme Yöntemlerine İlişkin Bilgiler</b></p>

                                <p style={{ whiteSpace: 'break-spaces' }}>
                                    {`Ödeme Yöntemi : Kredi kartı
Kargo ücreti : ${cargoPrice + ' TL'}
Toplam Sipariş Bedeli : ${totalPrice + ' TL'}
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
                                    Alıcının cayma hakkını kullanması da dahil kanunun veya sözleşmenin taraflara tanıdığı haklar çerçevesinde bedel iadesi yapılacak olması halinde bu iade Alıcının seçtiği ödeme aracına ve Satıcı’nın yaptığı tahsilata uygun olarak gerçekleştirilir.
                                </p>

                                <h5 className='text-black my-5'>C - Teslimata İlişkin Kurallar</h5>

                                <p>
                                    <b className='text-black'>5 - </b>
                                    Teslimat Alıcının siparişi oluştururken belirlediği ve yukarıda da ayrıca ifade edilen adrese gerçekleştirilir. Ön bilgilendirme formunda da belirtildiği gibi Alıcının veya Alıcı adına teslime yetkili kişinin Alıcının belirttiği adreste bulunmaması veya Alıcının teslimat adresi olarak satıcı mağazasını belirlediği durumlarda kendisine teslimat için bildirim yapılmasına rağmen süresinde gelmemesi hallerinde Satıcı edimini eksiksiz ve tam yerine getirmiş sayılır.
                                </p>

                                <p>
                                    <b className='text-black'>6 - </b>
                                    Alıcı tarafından sipariş tamamlandığı andan itibaren Satıcı, siparişe konu ürünü/ürünleri 30 gün içinde sağlam, eksiksiz, eğer varsa garanti belgeleri ve kullanma kılavuzları ile beraber Alıcının siparişi oluştururken teslim yeri olarak belirttiği adrese teslimini sağlar. Teslim anına kadar hasar satıcıya aittir.
                                </p>

                                <p>
                                    <b className='text-black'>7 - </b>
                                    Alıcı teslim adresi olarak satıcı mağazasını tercih etmişse satıcı 30 gün içinde ürünü ilgili adrese ulaştırır ve alıcının siparişi oluştururken belirttiği mobil telefondan çağrı veya SMS yoluyla ya da bildirdiği elektronik posta aracılığı ile alıcıyı bilgilendirerek ürünü teslime hazır hale getirir. Alıcının sipariş sırasında belirlediği teslim adresinin değiştirilmesi talebi satıcıyı bağlamaz.
                                </p>

                                <p>
                                    <b className='text-black'>8 - </b>
                                    Alıcının belirttiği adrese zamanında ve usulüne uygun bir şekilde ürünün teslimi için gerekenler yapıldığı halde, adresin yanlış verilmesi, adreste Alıcının veya Alıcı adına ürünü kabul edebilecek kimsenin bulunmaması gibi Alıcı kaynaklı nedenlerden ötürü ürün teslim alınamadığı takdirde Alıcı durumla ilgili bilgilendirilir ve ürünün teslim edilebileceği imkanlar kendisine açıklanır. Alıcı buna rağmen ürünü teslim almaz ise satıcı sözleşmeden döner ve Alıcıya tahsil edilmiş satış bedelini tahsil yöntemine uygun bir biçimde derhal iade eder.
                                </p>

                                <p>
                                    <b className='text-black'>9 - </b>
                                    Alıcı teslim adresi olarak satıcı mağazasını tercih etmiş ve siparişi oluştururken belirttiği mobil telefondan çağrı, belirttiği elektronik postasına ileti veya SMS yoluyla bilgilendirilmesine rağmen ürünü teslim almamışsa satıcı sözleşmeden döner ve alıcıya tahsil edilmiş satış bedelini tahsil yöntemine uygun bir biçimde derhal iade eder.
                                </p>

                                <h5 className='text-black my-5'>D - Müşteri Hizmetleri</h5>

                                <p>
                                    <b className='text-black'>10 - </b>
                                    Alıcı bütün kanuni ve sözleşmesel haklarının yanı sıra satıcının elektronik sitesindeki müşteri hizmetleri bölümü ile iletişime geçerek şikayetlerini, eleştirilerini, önerilerini iletebilir.
                                </p>

                                <h5 className='text-black my-5'>E - Cayma Hakkı ve Cayma Hakkının Kullanılmasına İlişkin Hükümler</h5>

                                <p>
                                    <b className='text-black'>11 - </b>
                                    Alıcı ürünün kendisine veya kendisi adına ürünü teslim almaya yetkili kimseye tesliminden itibaren on dört (14) gün içinde herhangi bir neden göstermeksizin sözleşmeden cayabilir. Alıcının tek bir siparişine ilişkin birden fazla teslimat yapılmış ise süre en son malın tesliminden başlar.
                                </p>

                                <p>
                                    <b className='text-black'>12 - </b>
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

                                <h5 className='text-black my-5'>F - Cayma Hakkının Kullanılamayacağı Haller</h5>

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

                                <h5 className='text-black my-5'>G – Mücbir Sebepler</h5>

                                <p>
                                    <b className='text-black'>19 - </b>
                                    Satıcı mücbir sebeplerin, beklenmeyen hallerin varlığı nedeniyle satış konusunun teslimini gerçekleştiremeyecek ise durumu derhal Alıcı’ya bildirir. Bu durumda sipariş iptal edilmiş sayılı ve eğer var ise teslimat masrafları ile birlikte Alıcı’nın ödediği bedel kendisine iade edilir.
                                </p>

                                <h5 className='text-black my-5'>H - Uyuşmazlıkların Çözümü</h5>

                                <p>
                                    <b className='text-black'>20 - </b>
                                    Bu mesafeli satış sözleşmesinden kaynaklanan uyuşmazlıklarda sözleşmenin kurulduğu tarihte yürürlükte olan güncel parasal sınırlara göre alıcının ikamet ettiği ya da alıcının işlem yaptığı il/ilçe hakem heyetleri ile satıcının yerleşim yeri veya tüketicinin yerleşim yeri Tüketici Mahkemeleri görevli ve yetkilidirler.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </PopupWrapper>
        )
    }
}

export default MembershipAgreement
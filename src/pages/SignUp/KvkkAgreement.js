import React from 'react'

import PopupWrapper from '../../components/PopupWrapper/PopupWrapper'

class KvkkAgreement extends React.Component {
  onOutsideClick = (event) => {
    if (event.target !== event.currentTarget) {
      return
    }

    this.props.hideKvkkAgreementPopup()
  }

  onCloseClick = (event) => {
    this.props.hideKvkkAgreementPopup()
  }

  render() {// TODO REVIEW
    return (
      <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
        <div className='col-md-12 d-flex'>
          <div className='row'>
            <div className='col-md-12'>
              <p className='p-lg-5' style={{ whiteSpace: 'break-spaces' }}>
                <h2 className='text-black text-center mb-5'>Silfavell Kişisel Veri İşleme Faaliyetlerine İlişkin Aydınlatma Metni</h2>
                <p><b className='text-black'>Kişisel Veri Tanımı</b></p>

                <p>Kişisel veri kimliği belirli veya belirlenebilir bir gerçek kişiye ilişkin acolan her türlü veridir. Kişinin politik, cinsel, sendikal eğilimlerine ilişkin bilgileri, Sağlık bilgileri, adli bilgileri, biyometrik ve genetik bilgileri özel nitelikte kişisel veridir.</p>

                <p><b className='text-black'>Veri Sorumlusu Tanımı</b></p>

                <p>Silfavell, silfavell.com üzerinden yapılan alışverişlerde veri öznelerinin ilgili alanları doldurması ile, sitede yer alan çerezlerle, mağazalarda müşteriden alışveriş, şikayet veya kart programı yöntemleri ile veri özneleri tarafından kendisine aktarılan kişisel verileri veri sorumlusu sıfatıyla otomatik olarak işlemektedir.</p>

                <p><b className='text-black'>Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebep</b></p>

                <p>Silfavell, 6698 sayılı Kişisel Verilerin Korunması Hakkındaki Kanunun m. 5. Hükmünde belirtilen hukuki sebepler doğrultusunda kişisel veri işlemektedir. Bu açıdan</p>

                <p>
                  <b className='text-black'>-</b> Kanunlarda açıkça öngörülmesi.</p>

                <p>
                  <b className='text-black'>-</b> Fiili imkânsızlık nedeniyle rızasını açıklayamayacak durumda bulunan veya rızasına hukuki geçerlilik tanınmayan kişinin kendisinin ya da bir başkasının hayatı veya beden bütünlüğünün korunması için zorunlu olması.</p>

                <p>
                  <b className='text-black'>-</b> Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin gerekli olması.</p>


                <p>
                  <b className='text-black'>-</b> Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması.</p>


                <p>
                  <b className='text-black'>-</b> İlgili kişinin kendisi tarafından alenileştirilmiş olması.</p>

                <p>
                  <b className='text-black'>-</b> Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması.</p>

                <p>
                  <b className='text-black'>-</b> İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması ve bu sebeplerin herhangi birisinin kapsamına girmeyen durumlarda veya özel nitelikli kişisel veri işlemelerinde veri öznesinin açık rızasını alarak veri işlemektedir.</p>

                <p>Yukarıda belirtilen sebeplerle bağlantılı olarak Silfavell aşağıdaki amaçlarla veri işlemektedir.</p>

                <p>Silfavell ticari faaliyetlerinin yürütülmesi, Silfavell, internet sitesinden alışveriş yapan kimselerin siparişlerinin yerine getirilmesi, satış sözleşmesinin ifası, satış sözleşmesi kaynaklı hak ve borçların temini, siteden üyelere sunulan hizmetlerin yerine getirilmesini sağlamak, üyelere siteye giriş yaptıklarında özel alışkanlıklarına göre site üzerinde önerilerde bulunmak, üyeye özel sayfada tasarım yapmak için üye kişisel verilerini işler ve ilgili alıcı grubu ile paylaşır.</p>

                <p>Silfavell Kart sahiplerinin, üyelik ilişkisinden, müşteri kartı programından kaynaklı haklarını temin için bu veri sahiplerinin kişisel verileri işlenir ve bu amaç doğrultusunda gerekli olduğu takdirde ilgili alıcı grupları ile paylaşılır.</p>

                <p>Silfavell, internet sitesinden faydalanılmasını artırmak, site üzerinden sunulan hizmetlerin güvenliğini sağlamak ve 5651 sayılı kanun çerçevesindeki yükümlülükleri yerine getirmek için ziyaretçilerin site kullanım bilgilerini saklar. İnternet sitesi ziyaretçilerinin kişisel verileri, Silfavell pazarlama stratejilerinin belirlenmesinde, üye alışkanlıklarına göre planlanmış önerilerin geliştirilmesinde kullanılır. Bunun için Silfavell’in çerez politikasında da ayrıca açıklamalar yer almaktadır. Site ziyaretçileri istedikleri çerezleri Çerez politikasında da belirtilen yöntemleri kullanarak istedikleri zaman silebilirler.</p>

                <p>Silfavell, veri sahiplerinin kişisel verileri ile alışveriş alışkanlıklarının analizini yaparak bu kişilere yönelik kampanya içeriklerini Silfavell.com üzerinde kişiye özel kampanyaların oluşturulması amacıyla kullanmaktadır. Bu faaliyet veri öznesinin Silfavell Kart üyeliği kapsamında açık rıza vermesi ile yapılmaktadır.</p>

                <p>Silfavell veri öznesinin kendisine elektronik ticari iletişim izni vermesi halinde ilgili kampanya bilgilerini tercih edilen iletişim adresine pazarlama amaçlı olarak iletir. Bu faaliyet veri öznesinin Silfavell Kart programı çerçevesinde kendisine elektronik ticari ileti gönderilmesine izin vermesi ile yapılmaktadır.</p>

                <p>Silfavell mağazalarında mağazanın, personelin ve müşterilerin güvenliğinin sağlanması için kamera ile görüntülü izleme yapılmaktadır.</p>


                <p><b className='text-black'>Kişisel Veri Alıcı Grupları</b></p>

                <p>Silfavell yukarıda belirtilen amaçlar doğrultusunda ve bu amaçlar gerektirdiği ölçüde veri işleme sebeplerini dikkate alarak şirket faaliyetlerini ve iş süreçlerini devam ettirmek için hizmet sunan ilgili departmanlar ile,</p>

                <p>Yukarıda belirtilen amaçlar doğrultusunda ve veri işleme sebeplerine dikkat ederek Şirket adına kişisel veri işleyen yurt içi ve/veya yurt dışı hizmet sağlayıcılarına</p>

                <p>Silfavell, mahkemelerin ve kanunen kendisinden bilgi talep etmeye yetkili idari ve adli makamların usulüne uygun talepleri gereği veri aktarımı yapabilmektedir.</p>

                <p>Silfavell’in internet sitesi üzerinden topladığı kişisel veriler, üçüncü kişi çözüm ortağına ait serverları yurt dışında bulunan güvenli bulut veri tabanında saklanmaktadır.</p>

                <p>Silfavell, kendisi ile ticari iletişim kurulmasına izin veren veri sahiplerinin ad, soyad ve iletişim bilgilerini bu iletişimin sağlanması için üçüncü kişi çözüm ortağına iletir.</p>

                <p>İnternet sitesinden alışveriş yapan kimselerin ad soyad, iletişim ve adres bilgileri sipariş sürecinin tamamlanması için yurt içinde yerleşik üçüncü kişi taşıyıcı firmaya iletilir.</p>

                <p>Silfavell, elektronik ticaret sitesi üzerinden sunulan hizmetlerle ilgili geliştirmeleri belirleyebilmek ve müşteri memnuniyetini belirleyebilmek adına yurt içinde yerleşik üçüncü kişi çözüm ortağı aracılığı ile site kullanıcılarına memnuniyet anketlerini içeren elektronik postalar ulaştırmaktadır.</p>

                <p><b className='text-black'>Toplanan Kişisel Veriler</b></p>

                <p>Silfavell.com üzerinde alışveriş yapacak kişilerin ( ziyaretçi olarak veya üye olarak), adı, soyadı, tc kimlik numarası, adresi, iletişim bilgileri, eğer siparişini başkası teslim alacaksa o kişinin adı – soyadı ve iletişim bilgisi Siteye üye olacak kişilerin adı soyadı, adresi, doğum tarihi, cinsiyeti, iletişim bilgileri alışveriş geçmişi, ziyaret edilen sayfalar, alışveriş tercihleri, üyenin ürün sayfalarına yaptığı yorumlar, ürünlere ilişkin yaptığı değerlendirmeler.</p>

                <p>Site üyeliğinin haricinde Silfavell Kart sahibi olmak isteyen kimselerin cep telefonu numarası ve verecekleri izinlere bağlı olarak adı soyadı, doğum tarihi, cinsiyet bilgileri.</p>

                <p><b className='text-black'>Veri Sahibinin Açık Rızasına Dayalı İşleme</b></p>

                <p>Veri sahibinin alışveriş alışkanlıkları, ile kişisel verilerinin analizi suretiyle kişiye özel indirim veya puan kampanyalarının belirlenmesi, müşterinin beğenisine uygun ürünün tespit edilmesi bu bilgilerin ad, soyad ve iletişim bilgisi ile eşleştirilmesi, kişinin iletişim adresine bu içeriğin aktarılması için üçüncü kişi çözüm ortağı aracılığı ile aktarılması için veri sahibinin açık rızası alınmaktadır.</p>

                <p>Silfavell veri öznesinin kendisine elektronik ticari iletişim izni vermesi halinde ilgili kampanya bilgilerini tercih edilen iletişim adresine pazarlama amaçlı olarak iletir.</p>

                <p><b className='text-black'>Veri Sahibinin Hakları</b></p>

                <p>Veri sahipleri,</p>

                <p>
                  <b className='text-black'>a)</b> Kişisel veri işlenip işlenmediğini öğrenme,</p>

                <p>
                  <b className='text-black'>b)</b> Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</p>

                <p>
                  <b className='text-black'>c)</b> Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</p>

                <p>
                  <b className='text-black'>ç)</b> Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</p>

                <p>
                  <b className='text-black'>d)</b> Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</p>

                <p>
                  <b className='text-black'>e)</b> 7 nci maddede öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme,</p>

                <p>
                  <b className='text-black'>f)</b> (d) ve (e) bentleri uyarınca yapılan işlemlerin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</p>

                <p>
                  <b className='text-black'>g)</b> İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</p>

                <p>
                  <b className='text-black'>ğ)</b> Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme, haklarına sahiptir.</p>

                <p><b className='text-black'>Veri Sahipleri Hakları</b></p>

                <p>Veri Sahipleri, Kanunun 11 inci maddesinde belirtilen hakları kapsamında taleplerini, yazılı olarak veya kayıtlı elektronik posta (KEP) adresi, güvenli elektronik imza, mobil imza ya da ilgili kişi tarafından veri sorumlusuna daha önce bildirilen ve veri sorumlusunun sisteminde kayıtlı bulunan elektronik posta adresini kullanmak suretiyle Talep konusu bildirerek, Silfavell’in elektronik posta adresi olan info@Silfavell.com’a kendi kayıtlı elektronik posta adreslerinden veya Silfavell’e daha önce bildirmiş oldukları elektronik posta adresinden gönderecekleri elektronik posta veya Silfavell.com üyesi olan veri sahiplerinin üyelik girişi yaptıktan sonra Hesabım içerisinde yer alan www.Silfavell.com/mesajlarım/yeni sayfasından dolduracakları formu düzenleyip göndererek veya bu formun çıktısını alarak ve veriler üzerinde hak sahibi olduklarını gösteren bilgileri ( Ad soyad, yazılı başvurularda imza, TC Kimlik numarası, Tebligata elverişli adres, bildirime esas elektronik posta adresi telefon numarası) de belirterek ( kimlik fotokopisi gibi eklemeler yapmaksızın) Silfavell Yavuz Sultan Selim, Dr. Sadık Ahmet Cd. No:24, 34083 Fatih/İstanbul adresine göndererek kullanabilirler. Başvurular Silfavell tarafından başvurunun Silfavell’e ulaşmasından itibaren 30 gün içinde yanıtlanır. Veri sahibinin talebinin başvurusuna yazılı olarak verilecek yanıtlarda işlemin ayrıca bir maliyet gerektirmesi hâlinde on ( 10) sayfaya kadar ücret alınmaz. Bu miktarın üzerindeki her sayfa için 1 TL ücret alınabilir.</p>

              </p>
            </div>
          </div>
        </div>
      </PopupWrapper>
    )
  }
}

export default KvkkAgreement
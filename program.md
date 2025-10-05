# Pomodoro Uygulaması Proje Rehberi

Bu rehber, projedeki dosya yapısını ve her dosyanın/fonksiyonun ne işe yaradığını adım adım açıklar. Kendi Pomodoro uygulamanı geliştirmek için bu rehberi takip edebilirsin.

---

## 1. Proje Dosya Yapısı

```
app/
  _layout.tsx
  +not-found.tsx
  (tabs)/
    _layout.tsx
    break.tsx
    index.tsx
    settings.tsx
    stats.tsx
  auth/
    _layout.tsx
    login.tsx
    register.tsx
assets/
  fonts/
  images/
src/
  AppProvider.tsx
  components/
  constants/
  context/
  firebase/
  hooks/
  navigation/
  screens/
```

---

## 2. Ana Klasörler ve Dosyalar

### **app/**  
Uygulamanın sayfa ve navigasyon dosyaları burada bulunur.  
- `_layout.tsx`: Tüm uygulama için ana layout ve sağlayıcıları içerir.  
- `+not-found.tsx`: Bulunamayan sayfa için hata ekranı.  
- `(tabs)/`: Alt sekmeler (Pomodoro, Ayarlar, İstatistikler, Mola) için dosyalar.  
- `auth/`: Giriş ve kayıt ekranları.

### **assets/**  
Görseller ve fontlar burada tutulur.

### **src/**  
Uygulamanın asıl işlevsel kodları burada yer alır.  
- `AppProvider.tsx`: Tüm context sağlayıcılarını bir araya getirir.
- `components/`: Tekrar kullanılabilir UI bileşenleri (buton, kart, metin vb.).
- `constants/`: Sabitler (renkler, çeviriler).
- `context/`: Global state yönetimi (kullanıcı, ayarlar, geçmiş).
- `firebase/`: Firebase bağlantı dosyaları.
- `hooks/`: Özel React hook'ları (tema, renk şeması).
- `navigation/`: Navigasyon yapılandırmaları.
- `screens/`: Ekran bileşenleri (Pomodoro, Ayarlar, İstatistikler, Mola).

---

## 3. Önemli Dosyalar ve Görevleri

### **app/_layout.tsx**  
Uygulamanın ana sağlayıcılarını ve navigasyonunu başlatır.

### **app/(tabs)/index.tsx**  
Ana sekmede Pomodoro ekranını gösterir.

### **app/(tabs)/break.tsx**  
Mola ekranını gösterir.

### **app/(tabs)/stats.tsx**  
İstatistik ekranını gösterir.

### **app/(tabs)/settings.tsx**  
Ayarlar ekranını gösterir.

### **app/auth/login.tsx & app/auth/register.tsx**  
Giriş ve kayıt işlemlerini yönetir.

### **src/AppProvider.tsx**  
Tüm context sağlayıcılarını bir arada tutar.

### **src/context/**  
- `AuthContext.tsx`: Kullanıcı oturumunu yönetir.
- `SettingsContext.tsx`: Kullanıcı ayarlarını yönetir.
- `HistoryContext.tsx`: Pomodoro geçmişini yönetir.

### **src/components/custom/**  
- `CustomButton.tsx`: Özelleştirilebilir buton.
- `CustomCard.tsx`: Kart görünümü.
- `CustomText.tsx`: Tema uyumlu metin.
- `CustomTextInput.tsx`: Giriş alanı.

### **src/constants/Colors.ts**  
Tema renklerini tanımlar.

### **src/constants/Translations.ts**  
Çeviri metinlerini tutar.

### **src/firebase/**  
- `firebaseConfig.ts`: Firebase yapılandırması.
- `auth.ts`: Firebase kimlik doğrulama.
- `firestore.ts`: Firebase Firestore bağlantısı.

### **src/hooks/**  
Tema ve renk şeması için özel hook'lar.

### **src/screens/Main/**  
Her sekmenin ekran bileşenleri (Pomodoro, Break, Stats, Settings).

---

## 4. Adım Adım Kendi Uygulamanı Geliştirmek

1. **Proje oluştur:**  
   ```sh
   npx create-expo-app pomodoro
   cd pomodoro
   npm install
   ```

2. **Dosya yapısını oluştur:**  
   Yukarıdaki dosya ve klasörleri oluştur.

3. **Firebase ayarlarını yap:**  
   [src/firebase/firebaseConfig.ts](src/firebase/firebaseConfig.ts) dosyasını kendi Firebase bilgilerinle doldur.

4. **Context sağlayıcılarını ekle:**  
   [src/AppProvider.tsx](src/AppProvider.tsx) dosyasını ve context dosyalarını oluştur.

5. **Ana layout ve navigasyonu kur:**  
   [app/_layout.tsx](app/_layout.tsx) ve [app/(tabs)/_layout.tsx](app/(tabs)/_layout.tsx) dosyalarını oluştur.

6. **Ekran bileşenlerini yaz:**  
   [src/screens/Main/PomodoroScreen.tsx](src/screens/Main/PomodoroScreen.tsx) gibi ekranları oluştur.

7. **UI bileşenlerini ekle:**  
   [src/components/custom/](src/components/custom/) klasöründeki bileşenleri oluştur.

8. **Çeviri ve tema desteği ekle:**  
   [src/constants/Translations.ts](src/constants/Translations.ts) ve [src/constants/Colors.ts](src/constants/Colors.ts) dosyalarını doldur.

9. **Test et ve geliştir:**  
   `npx expo start` ile uygulamanı başlat, eksik veya hatalı kısımları tamamla.

---

## 5. Ekstra Bilgiler

- Her dosyanın başında ne işe yaradığını açıklayan yorumlar ekle.
- Kodun okunabilir ve modüler olmasına dikkat et.
- Geliştirme sırasında Expo dokümantasyonunu kullan: https://docs.expo.dev/

---

## 6. Sıkça Sorulan Sorular

- **Hata alırsam ne yapmalıyım?**  
  Konsoldaki hata mesajını incele, eksik bağımlılıkları yükle (`npm install`), dosya yollarını kontrol et.

- **Firebase bağlantısı çalışmıyor?**  
  Firebase projesi oluştur, API anahtarlarını doğru gir, ilgili paketleri yükle.

---

Bu rehberi takip ederek kendi Pomodoro uygulamanı adım adım geliştirebilirsin!

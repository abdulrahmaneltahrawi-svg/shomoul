const branchesData = [
    { name: "Al Ahsa", address: "Al-Bustan Dist. in front of Othaim Mall, Al Ahsa, Saudi Arabia", phones: ["+966569664585", "+966569924359"] },
    { name: "Jeddah", address: "Office 58, Al Qemah Business Center, Al-Baladyah Street, Azizyah", phones: ["+966569929320"] },
    { name: "Dammam", address: "AlFurqan Complex, King Fahd Rd., Al Faisaliyah, Dammam 32272", phones: ["+966567555900"] },
    { name: "Medina", address: "Opening Soon!", phones: ["+966567555900"] },
    { name: "Riyadh", address: "King Faisal Dist. Sheikh Hassan bn Hussein St., Exit 10", phones: ["+966569970640"] },
    { name: "Al Jubail", address: "Al Madinah Al Munawarah St, Near Jubail Mall, Al-Mirqab", phones: ["+966569926801"] },
    { name: "Tabuk", address: "Opening Soon!", phones: ["+966567555900"] },
    { name: "Abha", address: "Opening Soon!", phones: ["+966567555900"] },
    { name: "Egypt", address: "28C Al Mostathmereen Al Shamaleya, New Cairo, Egypt", phones: ["+966562780656"] },
    { name: "Turkey", address: "Aksemsettin Mah. Adnan Menderes Vatan Bul. Fatih, Istanbul", phones: ["+966567555900"] },
    { name: "UAE", address: "Third Floor, Dubai World Trade Center, Sheikh Zayed Road", phones: ["+971568305900"] }
];

function renderBranches() {
    const container = document.getElementById('branches-container');
    
    container.innerHTML = branchesData.map(branch => `
        <div class="branch-card ${branch.address.includes('Soon') ? 'coming-soon' : ''}">
            <div class="branch-header">
                <span class="location-icon">📍</span>
                <h3>${branch.name}</h3>
            </div>
            <div class="branch-content">
                <p class="address">${branch.address}</p>
                <div class="phone-box">
                    ${branch.phones.map(phone => `
                        <a href="tel:${phone.replace(/\s/g, '')}" class="phone-link">
                           <span class="phone-icon">📞</span> ${phone}
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// تشغيل الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', renderBranches);
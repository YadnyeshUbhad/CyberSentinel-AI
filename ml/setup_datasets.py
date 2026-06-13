import os
import csv
import random

directories = [
    "datasets/text_detection",
    "datasets/url_detection",
    "datasets/processed",
    "ml/text_model/saved_models",
    "ml/url_model/saved_models",
    "ml/notebooks"
]

for d in directories:
    os.makedirs(d, exist_ok=True)
    print(f"Created directory: {d}")

ham_templates = [
    "Hey, are we still meeting for lunch today at 12:30?",
    "Can you please send me the report by the end of the day? Thanks.",
    "Just wanted to follow up on our discussion yesterday. Let me know when you're free.",
    "I'll be home in about 20 minutes. Please make sure the oven is preheated.",
    "Hi team, here is the agenda for tomorrow's weekly sync meeting.",
    "Your package has been delivered to your front porch. Have a great day!",
    "Are you free for a quick call to review the design designs?",
    "Thanks for the update. I'll review it and get back to you shortly.",
    "Hi Mom, just calling to say I love you and check how you are doing.",
    "Can you pick up some milk and eggs on your way back from work?",
    "The weather is lovely today, we should go for a walk in the evening.",
    "Your dentist appointment is confirmed for Tuesday at 10:00 AM.",
    "Hey! Don't forget we have band practice tonight at 7.",
    "Please find attached the receipt for your recent purchase at the grocery store.",
    "Hi, I noticed a typo on slide 5 of the presentation, can you fix it?",
    "Let's reschedule the coffee chat to Friday if that works better for you.",
    "Yes, I can help you move your couch this weekend. Just let me know the time.",
    "The meeting has been moved to room 302 due to technical issues in the main hall.",
    "Your subscription payment was processed successfully. Thank you for your business.",
    "Hey buddy, happy birthday! Hope you have an amazing day!"
]

sms_spam_templates = [
    "CONGRATULATIONS! You have won a free $1000 Walmart gift card! Claim your prize now at http://win-walmart.xyz",
    "URGENT: Your mobile account has outstanding charges. Pay now to avoid suspension: http://pay-fees.top",
    "You have been selected for a work from home job! Earn $500/day. Apply now at http://job-offers.club",
    "FREE ENTRY! Text WIN to 80090 to enter our weekly cash draw and win £5000! T&C apply.",
    "Your package could not be delivered due to an incomplete address. Update here: http://post-office-redelivery.info",
    "Loan approved! Get up to $5000 in your bank account today. No credit check! Click http://cash-advance.bid",
    "URGENT: Standard Chartered Alert! Unusual activity detected. Verify your details now: http://sc-safe.com",
    "Private Msg: We are trying to contact you regarding your unclaimed PPI compensation of £3000. Reply CLAIM.",
    "Dating Alert: 1 new message from Sarah! She is nearby. View her profile here: http://sarah-chat.xyz",
    "Your bank account has been locked due to suspicious login. Verify identity here: http://secure-bank-login.xyz"
]

phishing_email_templates = [
    "Dear Customer, We detected an unauthorized login attempt to your PayPal account from an unrecognized device in Russia. If this was not you, please secure your account immediately by clicking the link below: http://secure-paypal-login.xyz/security",
    "Subject: Update Your Netflix Payment Details. We were unable to process your monthly subscription payment. To keep watching, please update your billing details: http://netflix-billing-update.top/login",
    "Subject: Apple ID Security Alert. Your Apple ID has been suspended due to security reasons. To reactivate your account, please log in and verify your personal information: http://verify-appleid-support.xyz/auth",
    "Subject: Chase Bank - Account Verification Required. We are updating our security systems. All customers are required to update their online banking credentials before 24 hours to prevent account lockout: http://chase-online-banking-update.net",
    "Dear Microsoft User, Your Office365 password will expire in 24 hours. Keep your current password by verifying your login details here: http://secure-signin-microsoft.info/login.php",
    "Subject: Google Security: Critical Alert. Someone just signed into your account from a new Windows device. If this was not you, please change your password: http://google-security-team.gq/login",
    "Warning: IRS Tax Refund Notification. You are eligible for a tax refund of $432.10. Submit your claim form immediately to receive funds directly in your bank account: http://irs-refund-claims.info",
    "Subject: Urgent Action Required - Document Shared with You. Your manager shared an urgent invoice via OneDrive. Please log in to view the document: http://onedrive-secure-view.tk/login",
    "Subject: Facebook Security Department. Your account has been reported for violating terms of service. Verify your identity within 48 hours or your account will be permanently disabled: http://facebook-verify-account.tk",
    "Subject: Coinbase Security Notification. A withdrawal of 0.45 BTC has been initiated. If you did not request this, cancel the transaction immediately: http://coinbase-transaction-cancel.com"
]

fraudulent_email_templates = [
    "Dearest One, I am Mrs. Mariam Abacha, widow of the late military dictator. I have the sum of $25 Million USD that I wish to transfer to your private account for investment purposes. I will compensate you with 30% of the funds...",
    "Subject: Urgent Business Proposal. I am a manager at a bank in South Africa. I discovered an unclaimed deposit of $12.5M from a deceased foreign national. I need your assistance to claim these funds as the next of kin...",
    "Subject: Lottery Winning Notification! Your email address has won $1,000,000.00 USD in the Coca-Cola Mega Anniversary Promo. To process your claims, please contact our agent with your full name, country, and phone number...",
    "Crypto Investment Masterclass: Multiply your savings by 10x in just 7 days! Our AI-powered trading bot guarantees risk-free returns. Deposit your Bitcoin today at http://crypto-growth-guaranteed.top",
    "Subject: Mystery Shopper Job Offer. We are recruiting secret shoppers in your area. You will receive a check for $2,000. Cash it, keep $400, and spend the rest purchasing iTunes gift cards to test customer service...",
    "Dear Friend, I am writing to you from my hospital bed. I am suffering from terminal cancer and want to donate my estate of $5.4 Million to a god-fearing charity or individual who will execute my last wishes...",
    "Subject: Inherited Funds Release. The United Nations Compensation Commission has approved the release of your long overdue payment of $1.5 Million USD. Please pay the clearance fee of $150 via Western Union to get your card...",
    "Earn easy money renting out your bank account! We need local agents to receive transfers and forward them via Bitcoin. Keep a 10% commission. No experience needed! Contact us at http://fast-cash-agents.club",
    "Subject: Direct Bank Wire Transfer. I am Dr. Fredrick Cole, director of the Central Bank. We have recovered your funds from corrupt officials. Please send your bank routing number, account number, and SSN to verify...",
    "Subject: Urgent Partnership Request. I have a lucrative gold trading opportunity in Ghana. We need a foreign partner to provide a shipping clearance fee of $3,500. We will share the profits 50/50, yielding over $200,000..."
]

def generate_text_dataset(filename, templates, label_mapping, count=1000):
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["label", "text"])
        for label, text_list in templates.items():
            for t in text_list:
                writer.writerow([label_mapping[label], t])
        labels = list(templates.keys())
        for _ in range(count - sum(len(lst) for lst in templates.values())):
            lbl = random.choice(labels)
            template = random.choice(templates[lbl])
            greetings = ["Hello, ", "Hi! ", "Dear, ", "Hey, ", "Urgent: ", "", "Warning: "]
            endings = [" Thank you.", " Reply ASAP.", " Visit now.", " Code: " + str(random.randint(1000, 9999)), " Click details.", ""]
            text = random.choice(greetings) + template + random.choice(endings)
            text = text.replace("Subject: ", "").replace("Dear Customer, Dear", "Dear")
            writer.writerow([label_mapping[lbl], text])

generate_text_dataset("datasets/text_detection/sms_spam_collection.csv", {"ham": ham_templates, "spam": sms_spam_templates}, {"ham": "ham", "spam": "spam"}, count=800)
generate_text_dataset("datasets/text_detection/phishing_emails.csv", {"ham": ham_templates, "phishing": phishing_email_templates}, {"ham": "legitimate", "phishing": "phishing"}, count=800)
generate_text_dataset("datasets/text_detection/fraudulent_email_corpus.csv", {"ham": ham_templates, "fraud": fraudulent_email_templates}, {"ham": "legitimate", "fraud": "fraud"}, count=800)

benign_domains = [
    "google.com", "wikipedia.org", "github.com", "microsoft.com", "stackoverflow.com",
    "bbc.com", "cnn.com", "amazon.com", "netflix.com", "linkedin.com", "youtube.com",
    "apple.com", "yahoo.com", "reddit.com", "twitter.com", "zoom.us", "dropbox.com",
    "medium.com", "nytimes.com", "spotify.com", "ebay.com", "imdb.com", "craigslist.org",
    "weather.com", "quora.com", "tripadvisor.com", "salesforce.com", "slack.com",
    "pinterest.com", "instagram.com"
]

phishing_keywords = ["login", "verify", "secure", "bank", "update", "paypal", "signin", "free", "bonus", "gift", "apple", "chase", "netflix", "refund"]
malicious_keywords = ["download", "update-installer", "patch", "crack", "keygen", "activex", "driver", "trojan", "virus", "win11-fix", "loader"]
defacement_keywords = ["hacked-by", "defaced", "anonymous", "ghost-crew", "cyber-army", "infidel", "r00t", "exploit"]
suspicious_tlds = ["xyz", "top", "club", "info", "loan", "bid", "gq", "cf", "tk", "ml", "ga", "work", "click"]

with open("datasets/url_detection/malicious_urls.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["url", "type"])
    for _ in range(1000):
        domain = random.choice(benign_domains)
        paths = ["about", "contact", "docs", "news", "products/item", "search", "faq", "blog/post"]
        url = f"https://www.{domain}/{random.choice(paths)}/{random.randint(100,999)}"
        writer.writerow([url, "benign"])
    for _ in range(800):
        brand = random.choice(["paypal", "apple", "chase", "netflix", "microsoft", "google", "facebook", "coinbase"])
        keyword = random.choice(phishing_keywords)
        tld = random.choice(suspicious_tlds)
        sub = random.choice(["secure", "login", "verify", "account", "support"])
        pattern = random.choice([
            f"http://{sub}-{brand}-{keyword}.{tld}",
            f"http://www.{brand}.com-{keyword}.{tld}/login.php",
            f"https://{brand}-{keyword}-verification.{tld}/auth/signin"
        ])
        writer.writerow([pattern, "phishing"])
    for _ in range(600):
        domain = f"get-free-{random.choice(malicious_keywords)}.{random.choice(suspicious_tlds)}"
        ext = random.choice(["exe", "zip", "dll", "msi", "scr", "apk", "jar"])
        url = f"http://{domain}/downloads/{random.choice(malicious_keywords)}_{random.randint(10,99)}.{ext}"
        writer.writerow([url, "malware"])
    for _ in range(400):
        domain = f"{random.choice(defacement_keywords)}-{random.randint(2000, 2030)}.{random.choice(suspicious_tlds)}"
        url = f"http://{domain}/index.html"
        writer.writerow([url, "defacement"])

with open("datasets/url_detection/phishing_websites.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["url", "label"])
    for _ in range(1000):
        domain = random.choice(benign_domains)
        url = f"https://{domain}/index.html"
        writer.writerow([url, "benign"])
    for _ in range(1000):
        brand = random.choice(["paypal", "netflix", "amazon", "apple", "wellsfargo"])
        keyword = random.choice(phishing_keywords)
        tld = random.choice(suspicious_tlds)
        url = f"http://{brand}-security-update-{keyword}.{tld}/login"
        writer.writerow([url, "phishing"])

print("Dataset generation complete!")

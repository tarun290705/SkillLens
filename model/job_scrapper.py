import requests
from bs4 import BeautifulSoup

# Target job board URL for 'web scraping' jobs
URL = "https://www.indeed.com/jobs?q=web+scraping"

response = requests.get(URL)
soup = BeautifulSoup(response.text, "html.parser")

jobs = soup.find_all("div", class_="job_seen_beacon")

for job in jobs:
    title = job.find("h2", {"class": "jobTitle"}).get_text(strip=True) if job.find("h2", {"class": "jobTitle"}) else ""
    company = job.find("span", {"class": "companyName"}).get_text(strip=True) if job.find("span", {"class": "companyName"}) else ""
    location = job.find("div", {"class": "companyLocation"}).get_text(strip=True) if job.find("div", {"class": "companyLocation"}) else ""
    summary = job.find("div", {"class": "job-snippet"}).get_text(strip=True).replace("\n", " ") if job.find("div", {"class": "job-snippet"}) else ""
    print(f"Title: {title}")
    print(f"Company: {company}")
    print(f"Location: {location}")
    print(f"Requirements/Summary: {summary}")
    print("-" * 40)

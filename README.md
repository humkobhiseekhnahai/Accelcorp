# Accelcorp Web Application

Accelcorp is a comprehensive web application designed to assist farmers and veterinarians with crop management and animal health. The application consists of two main components: a crop analysis tool and the Vaidya AI for animal disease information.

## Features

### Crop Analysis Tool
- Users can input market trends for various crops
- Farmers can provide location, soil type, and desired crop
- The system analyzes the data and provides:
  - Probability of success
  - Detailed crop-specific information
  - Environmental impact assessment
  - Economic projections

### Vaidya AI
- Focused on animal health and diseases
- Users can input a disease name
- The AI utilizes Large Language Models (LLM) to provide:
  - Detailed information about the disease
  - Source references, including book titles and page numbers

## How to Run the Project

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/accelcorp.git
   cd accelcorp
   ```

2. Start the frontend:
   ```
   cd frontend
   yarn
   yarn dev
   ```

3. Start the backend:
   ```
   cd backend
   yarn
   tsc -b
   node dist/index.js
   ```

4. Run Docker (ensure Docker is installed on your system):
   ```
   make sure you run postgres image in the docker container and add a connection url in .env
   ```
5. Update .env
    ```
    add VITE_GEMINI_API_KEY
    ```

5. Set up and run Vaidya AI:
   ```
   cd Vaidya
   python ingest.py
   python app.py
   ```

## Video Placeholder

To include a video demonstration of the application, you can use the following HTML snippet:

[![Watch the video](https://youtu.be/UUTAQdWme3k)](https://youtu.be/UUTAQdWme3k)

## Contributing

We welcome contributions to Accelcorp! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) file for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.




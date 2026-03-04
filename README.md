# Excel to JSON Converter

A modern, user-friendly web application that converts Excel files (.xlsx, .xls) to JSON format with ease. No installation required—just drag and drop your file!

## Deployed on GitHub Pages
🔗 https://jahnavibaddikuri.github.io/Excel-to-Json/

## ✨ Features

- **🎯 Simple Drag & Drop**: Easily upload Excel files by dragging and dropping
- **⚡ Fast Conversion**: Instantly converts Excel data to properly formatted JSON
- **📥 Auto Download**: Automatically downloads the converted JSON file
- **📋 Copy to Clipboard**: Quick copy button for the converted JSON
- **🎨 Modern UI**: Beautiful, responsive design that works on all devices
- **📊 Real-time Preview**: View the converted JSON output immediately
- **✅ Error Handling**: Clear, user-friendly error messages
- **🔄 Data Sanitization**: Automatic cleanup of special characters and formatting

## 🚀 Quick Start

1. **Open the Application**: Simply open `index.html` in your web browser
2. **Upload an Excel File**: 
   - Click to select a file OR
   - Drag and drop an Excel file onto the upload area
3. **Convert**: Click the "Convert to JSON" button
4. **Download & Copy**: The JSON file automatically downloads, or copy it to your clipboard

## 📋 Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Excel file (.xlsx or .xls format)
- No server or installation needed!

## 🛠️ Technologies Used

- **HTML5**: Document structure
- **CSS3**: Modern styling with gradients and animations
- **JavaScript**: File processing and conversion logic
- **XLSX.js**: Excel file parsing library (loaded from CDN)
- **Font Awesome**: Icons and visual elements (loaded from CDN)

## 📂 File Structure

```
Excel to JSON Converter/
├── index.html          # Main application interface
├── script.js           # Conversion logic and interactions
└── README.md           # This file
```

## 🎯 How It Works

1. **File Upload**: The application reads Excel files using the XLSX.js library
2. **Data Processing**: Converts the first row as headers and subsequent rows as data objects
3. **Sanitization**: Cleans up special characters, quotes, and formatting issues
4. **JSON Generation**: Creates properly formatted JSON with 2-space indentation
5. **Download**: Automatically triggers a download with a timestamp-based filename
6. **Preview**: Displays the converted JSON in a scrollable code box

## 📝 Excel Format Requirements

For best results, format your Excel file as follows:

| Column1 | Column2 | Column3 |
|---------|---------|---------|
| Value1  | Value2  | Value3  |
| Value4  | Value5  | Value6  |

- First row should contain column headers
- Data should start from the second row
- At least 2 rows required (1 header + 1 data row)

### Special Keys

- **`options`**: Automatically parsed as an array from comma-separated values
- **`explanation`**: Special formatting for text with preserved quotes
- **Other fields**: Standard string sanitization applied

## 💾 Output Format

The converted JSON will be formatted as:

```json
[
  {
    "column1": "value1",
    "column2": "value2",
    "column3": "value3"
  },
  {
    "column1": "value4",
    "column2": "value5",
    "column3": "value6"
  }
]
```

## 🌐 Browser Compatibility

- ✅ Google Chrome/Chromium (latest)
- ✅ Mozilla Firefox (latest)
- ✅ Apple Safari (latest)
- ✅ Microsoft Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 UI Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Feedback**: Status messages and toast notifications
- **Visual Indicators**: Loading states and file name display
- **Accessibility**: Clear button labels and visual feedback
- **Smooth Animations**: Polished transitions and interactions

## ⚙️ Advanced Features

### Data Sanitization

The converter automatically handles:
- Removal of stray quotes
- Escape sequence cleanup
- Array formatting for the `options` field
- Quote normalization in explanations

### Error Handling

Clear error messages for:
- Missing file selection
- Invalid Excel files
- Insufficient data rows
- File reading errors

## 📦 Installation for Local Development

1. Clone or download this repository
2. Open `index.html` directly in your browser
3. No build process or dependencies to install!

```bash
# If you want to serve it locally with a web server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

## 🔧 Customization

### Styling
Edit the `<style>` section in `index.html` to customize colors, fonts, and spacing.

### Conversion Logic
Modify the sanitization functions in `script.js`:
- `sanitizeString()`: Text field processing
- `sanitizeOptions()`: Array field processing
- `sanitizeExplanation()`: Special field processing

## 📄 License

This project is open source and available for personal and commercial use.


## 💡 Tips & Tricks

- **Large Files**: Works well with files containing thousands of rows
- **Multiple Sheets**: Only converts the first sheet in the workbook
- **Copy & Paste**: Easily copy the JSON output for use elsewhere
- **Validation**: The output is standard JSON format, compatible with all JSON parsers

## ❓ Troubleshooting

**Q: My Excel file won't convert**
- A: Make sure it's in .xlsx or .xls format and has at least 2 rows (header + data)

**Q: JSON output looks strange**
- A: Check that your Excel cells don't contain unusual formatting or special characters

**Q: Copy button doesn't work**
- A: Your browser may require HTTPS for clipboard access; try running on a local server

## 🚀 Performance

- **Instant Conversion**: Even large Excel files (10,000+ rows) convert in milliseconds
- **No Server Required**: Everything runs in your browser
- **Lightweight**: Minimal footprint with CDN-loaded dependencies

## 📞 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Made with care for developers who work with data**

Enjoy converting! 🎉

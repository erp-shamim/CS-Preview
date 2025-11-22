
        // JavaScript code remains the same as in the original
        const defaultConfig = {
            background_color: "#ffffff",
            surface_color: "#f0f0f0",
            text_color: "#000000",
            accent_color: "#c41e3a",
            border_color: "#333333",
            font_family: "Arial",
            font_size: 9,
            document_title: "COMPLAIN SHEET & REQUESTED SERVICE SHEET",
            company_name: "TOYOTA SERVICE CENTER",
            company_address: "123 Auto Plaza, Dhaka 1212 | Tel: +880-2-12345678 | service@toyota.com",
            footer_note: "This is a computer-generated document. Please verify all information before service commencement."
        };

        async function onConfigChange(config) {
            const customFont = config.font_family || defaultConfig.font_family;
            const baseFontStack = "'Helvetica', sans-serif";
            const baseSize = config.font_size || defaultConfig.font_size;
            
            document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
            document.body.style.fontSize = `${baseSize}pt`;
            
            const bgColor = config.background_color || defaultConfig.background_color;
            document.querySelector('.a4-page').style.background = bgColor;
            document.body.style.background = bgColor;
            
            const surfaceColor = config.surface_color || defaultConfig.surface_color;
            const sectionTitles = document.querySelectorAll('.section-title');
            sectionTitles.forEach(title => {
                title.style.background = surfaceColor;
            });
            
            const textColor = config.text_color || defaultConfig.text_color;
            document.body.style.color = textColor;
            
            const accentColor = config.accent_color || defaultConfig.accent_color;
            const redAccents = document.querySelectorAll('.red-accent, .highlight-red');
            redAccents.forEach(el => {
                el.style.color = accentColor;
            });
            
            const borderColor = config.border_color || defaultConfig.border_color;
            const documentHeader = document.querySelector('.document-header');
            documentHeader.style.borderBottom = `2px solid ${borderColor}`;

            document.documentElement.style.setProperty('--bg-color', bgColor);
            document.documentElement.style.setProperty('--surface-color', surfaceColor);
            document.documentElement.style.setProperty('--text-color', textColor);
            document.documentElement.style.setProperty('--accent-color', accentColor);
            document.documentElement.style.setProperty('--border-color', borderColor);
            
            const companyNameEl = document.getElementById('company-name');
            if (companyNameEl) {
                companyNameEl.textContent = config.company_name || defaultConfig.company_name;
                companyNameEl.style.fontSize = `${baseSize * 1.78}pt`;
            }
            
            const companyAddressEl = document.getElementById('company-address');
            if (companyAddressEl) {
                companyAddressEl.textContent = config.company_address || defaultConfig.company_address;
                companyAddressEl.style.fontSize = `${baseSize * 0.89}pt`;
            }
            
            const documentTitleEl = document.getElementById('document-title');
            if (documentTitleEl) {
                const titleText = config.document_title || defaultConfig.document_title;
                const parts = titleText.split('&');
                if (parts.length > 1) {
                    documentTitleEl.innerHTML = `<span class="red-accent">${parts[0].trim()}</span> & ${parts[1].trim()}`;
                } else {
                    documentTitleEl.innerHTML = `<span class="red-accent">${titleText}</span>`;
                }
                documentTitleEl.style.fontSize = `${baseSize * 1.44}pt`;
            }
            
            const footerNoteEl = document.getElementById('footer-note');
            if (footerNoteEl) {
                const footerText = config.footer_note || defaultConfig.footer_note;
                footerNoteEl.innerHTML = `
                    <p style="margin: 0;">${footerText}</p>
                    <p style="margin: 2px 0 0 0;">For queries, contact: service@toyota.com | +880-2-12345678</p>
                `;
            }
            
            const infoLabels = document.querySelectorAll('.info-label');
            infoLabels.forEach(label => {
                label.style.fontSize = `${baseSize * 0.83}pt`;
            });
            
            const infoValues = document.querySelectorAll('.info-value');
            infoValues.forEach(value => {
                value.style.fontSize = `${baseSize}pt`;
            });
        }

        function mapToCapabilities(config) {
            return {
                recolorables: [
                    {
                        get: () => config.background_color || defaultConfig.background_color,
                        set: (value) => {
                            config.background_color = value;
                            window.elementSdk.setConfig({ background_color: value });
                        }
                    },
                    {
                        get: () => config.surface_color || defaultConfig.surface_color,
                        set: (value) => {
                            config.surface_color = value;
                            window.elementSdk.setConfig({ surface_color: value });
                        }
                    },
                    {
                        get: () => config.text_color || defaultConfig.text_color,
                        set: (value) => {
                            config.text_color = value;
                            window.elementSdk.setConfig({ text_color: value });
                        }
                    },
                    {
                        get: () => config.accent_color || defaultConfig.accent_color,
                        set: (value) => {
                            config.accent_color = value;
                            window.elementSdk.setConfig({ accent_color: value });
                        }
                    },
                    {
                        get: () => config.border_color || defaultConfig.border_color,
                        set: (value) => {
                            config.border_color = value;
                            window.elementSdk.setConfig({ border_color: value });
                        }
                    }
                ],
                borderables: [],
                fontEditable: {
                    get: () => config.font_family || defaultConfig.font_family,
                    set: (value) => {
                        config.font_family = value;
                        window.elementSdk.setConfig({ font_family: value });
                    }
                },
                fontSizeable: {
                    get: () => config.font_size || defaultConfig.font_size,
                    set: (value) => {
                        config.font_size = value;
                        window.elementSdk.setConfig({ font_size: value });
                    }
                }
            };
        }

        function mapToEditPanelValues(config) {
            return new Map([
                ["document_title", config.document_title || defaultConfig.document_title],
                ["company_name", config.company_name || defaultConfig.company_name],
                ["company_address", config.company_address || defaultConfig.company_address],
                ["footer_note", config.footer_note || defaultConfig.footer_note]
            ]);
        }

        if (window.elementSdk) {
            window.elementSdk.init({
                defaultConfig,
                onConfigChange,
                mapToCapabilities,
                mapToEditPanelValues
            });
        }

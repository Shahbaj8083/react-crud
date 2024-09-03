import React, { useEffect } from "react";

export function Footer() {
    useEffect(() => {
        function copyrightYear() {
            var d = new Date();
            var y = d.getFullYear();
            document.getElementById("copyright").innerHTML = 'Copyright &copy; ' + y + ' Shahbaj Husen';
        }
        copyrightYear();
    }, []);

    return (
        <React.Fragment>
            <div className="border border-primary mt-5" style={{ height: '40px' }}>
                <footer className="d-flex justify-content-center align-items-center h-100">
                    <p className="mb-0" id="copyright"></p>
                </footer>
            </div>
        </React.Fragment>
    )
}
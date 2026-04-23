import AVFoundation
import CoreImage

let fileURL = URL(fileURLWithPath: "Screen_Recording.mp4")
let asset = AVURLAsset(url: fileURL)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero

let duration = asset.duration.seconds
let times = [0.0, duration * 0.25, duration * 0.5, duration * 0.75, duration * 0.99]

for (index, time) in times.enumerated() {
    let cmTime = CMTime(seconds: time, preferredTimescale: 600)
    do {
        let cgImage = try generator.copyCGImage(at: cmTime, actualTime: nil)
        let context = CIContext()
        let ciImage = CIImage(cgImage: cgImage)
        let url = URL(fileURLWithPath: "frame_\(index).png")
        if let colorSpace = cgImage.colorSpace {
            try context.writePNGRepresentation(of: ciImage, to: url, format: .RGBA8, colorSpace: colorSpace)
        }
    } catch {
        print("Failed: \(error)")
    }
}
print("Done extracting 5 frames")
